#[tauri::command(rename_all = "snake_case")]
// I haven't find a pretty way to write this function in Rust
pub fn send_post_request_with_json(
    uri: String,
    string_header_names: Vec<String>,
    string_header_values: Vec<String>,
    integer_header_names: Vec<String>,
    integer_header_values: Vec<i32>,
    json: String,
) -> String {
    let mut request_builder = ureq::post(uri);

    let len;
    if string_header_names.len() >= string_header_values.len() {
        len = string_header_values.len();
    } else {
        len = string_header_names.len();
    }

    for i in 0..len {
        // SAFETY: chosen smaller length upon
        request_builder = request_builder.header(&string_header_names[i], &string_header_values[i]);
    }

    let len;
    if integer_header_names.len() >= integer_header_values.len() {
        len = integer_header_values.len();
    } else {
        len = integer_header_names.len();
    }

    for i in 0..len {
        // SAFETY: chosen smaller length upon
        request_builder =
            request_builder.header(&integer_header_names[i], integer_header_values[i]);
    }

    request_builder
        .send(json)
        .unwrap()
        .body_mut()
        .read_to_string()
        .unwrap()
}
