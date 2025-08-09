mod screen_capture;

use crate::screen_capture::{
    capture_full_screen, capture_partial_screen, start_screen_area_selection,
};

#[cfg(desktop)]
use tauri::{AppHandle, Manager};

#[cfg(desktop)]
fn display_main_window(app: &AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.set_skip_taskbar(false);
        let _ = window.show();
        let _ = window.unminimize();
        let _ = window.set_focus();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    builder = builder
        .invoke_handler(tauri::generate_handler![
            capture_full_screen,
            capture_partial_screen,
            start_screen_area_selection
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            #[cfg(desktop)]
            {
                use tauri::menu::{Menu, MenuItem};
                use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
                use tauri::{Emitter, Manager, WindowEvent};
                use tauri_plugin_autostart::ManagerExt;
                use tauri_plugin_clipboard_manager::ClipboardExt;
                use tauri_plugin_global_shortcut::ShortcutState;

                let window = app.get_webview_window("main").unwrap();
                let window_clone = window.clone();
                window.on_window_event(move |event| match event {
                    WindowEvent::CloseRequested { api, .. } => {
                        api.prevent_close();
                        let _ = window_clone.minimize();
                        let _ = window_clone.hide();
                        let _ = window_clone.set_skip_taskbar(true);
                    }
                    _ => {}
                });

                let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
                let menu = Menu::with_items(app, &[&quit_item])?;

                TrayIconBuilder::new()
                    .menu(&menu)
                    .show_menu_on_left_click(false)
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "quit" => {
                            app.exit(0);
                        }
                        _ => {}
                    })
                    .on_tray_icon_event(|tray, event| match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } => {
                            let app = tray.app_handle();

                            if let Some(_) = app.get_webview_window("main") {
                                display_main_window(app);
                            }
                        }
                        _ => {}
                    })
                    .icon(app.default_window_icon().unwrap().clone())
                    .build(app)?;

                let autostart_manager = app.autolaunch();
                let _ = autostart_manager.enable();

                // Gets error when using with single-instance
                let _ = app.handle().plugin(
                    tauri_plugin_global_shortcut::Builder::new()
                        .with_shortcut("CommandOrControl+Shift+C")
                        .unwrap()
                        .with_handler(|app, _shortcut, event| {
                            if event.state == ShortcutState::Pressed {
                                if let Ok(text) = app.clipboard().read_text() {
                                    display_main_window(app);
                                    app.emit("window-unminimize", text).unwrap();
                                }
                            }
                        })
                        .build(),
                );
            }

            Ok(())
        });

    #[cfg(desktop)]
    {
        builder = builder
            .plugin(tauri_plugin_single_instance::init(|app, _, _| {
                display_main_window(app);
            }))
            .plugin(
                tauri_plugin_autostart::Builder::new()
                    .app_name("KiraTrans")
                    .build(),
            )
            .plugin(tauri_plugin_clipboard_manager::init());
    }

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
