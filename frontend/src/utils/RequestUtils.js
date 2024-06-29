import { API_URL } from "../config.js";

export async function get(path) {
  const response = await fetch(`${API_URL}${path}`);
  const json = await response.json();

  return json;
}

export async function post(path, data) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();

  return json;
}
