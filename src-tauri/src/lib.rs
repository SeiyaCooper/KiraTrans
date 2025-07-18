#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
                app.handle()
                    .plugin(tauri_plugin_store::Builder::default().build())?;
                #[cfg(desktop)]
                {
                    use tauri::{Emitter, Manager};
                    use tauri_plugin_clipboard_manager::ClipboardExt;
                    use tauri_plugin_global_shortcut::ShortcutState;
                    app.handle().plugin(
                        tauri_plugin_global_shortcut::Builder::new()
                            .with_shortcut("CommandOrControl+Shift+C")?
                            .with_handler(|app, _shortcut, event| {
                                if event.state == ShortcutState::Pressed {
                                    if let Ok(text) = app.clipboard().read_text() {
                                        let window = app.get_webview_window("main").unwrap();
                                        window.unminimize().unwrap();
                                        window.set_focus().unwrap();
                                        app.emit("window-unminimize", text).unwrap();
                                    }
                                }
                            })
                            .build(),
                    )?;
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
