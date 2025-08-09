#[tauri::command]
pub fn capture_full_screen(app_handle: tauri::AppHandle) {
    #[cfg(desktop)]
    {
        use tauri::Manager;
        use xcap::Monitor;

        let monitors = Monitor::all().unwrap();
        let monitor = monitors.get(0).unwrap();
        // Multi-monitors is currently unsupported.

        let image = monitor
            .capture_image()
            .expect("Failed while capturing monitor");

        image
            .save(
                app_handle
                    .path()
                    .app_cache_dir()
                    .unwrap()
                    .join("screen_capture.png"),
            )
            .expect("Failed while saving image");
    }

    #[cfg(not(desktop))]
    {
        panic!("Screen capture is not implemented for mobile plantforms yet")
    }
}

#[tauri::command]
pub fn capture_partial_screen(
    app_handle: tauri::AppHandle,
    x: u32,
    y: u32,
    width: u32,
    height: u32,
) {
    #[cfg(desktop)]
    {
        use tauri::Manager;
        use xcap::Monitor;

        let monitors = Monitor::all().unwrap();
        let monitor = monitors.get(0).unwrap();
        // Multi-monitors is currently unsupported.

        let image = monitor
            .capture_region(x, y, width, height)
            .expect("Failed while capturing monitor");

        image
            .save(
                app_handle
                    .path()
                    .app_cache_dir()
                    .unwrap()
                    .join("screen_capture_partial.png"),
            )
            .expect("Failed while saving image");
    }

    #[cfg(not(desktop))]
    {
        panic!("Screen capture is not implemented for mobile plantforms yet")
    }
}

#[tauri::command]
pub async fn start_screen_area_selection(app_handle: tauri::AppHandle) {
    #[cfg(desktop)]
    {
        use tauri::Manager;

        let main_window = app_handle.get_webview_window("main").unwrap();
        let _ = main_window.minimize();

        tauri::WebviewWindowBuilder::new(
            &app_handle,
            "screen-area-selection",
            tauri::WebviewUrl::App("/screen-area-selection".into()),
        )
        .decorations(false)
        .fullscreen(true)
        .visible(false)
        .always_on_top(true)
        .build()
        .unwrap();
    }

    #[cfg(not(desktop))]
    {
        panic!("Screen area selection is not implemented for mobile plantforms yet")
    }
}
