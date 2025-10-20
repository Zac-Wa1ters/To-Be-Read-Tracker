import axios from "axios";

// ---- CONFIG ----
const API_BASE = "https://unit-4-project-app-24d5eea30b23.herokuapp.com/";
const TEAM_ID = 1;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  params: { teamid: TEAM_ID },
  headers: { "Content-Type": "application/json" },
});

// --- Helper to unwrap API format ---
const unwrap = (res) => res.data?.response ?? [];

// --- API Functions ---
export async function getBooks() {
  const res = await api.get("/");
  return unwrap(res);
}

export async function getBook(id) {
  const res = await api.get(`/${id}`);
  const data = Array.isArray(res.data?.response)
    ? res.data.response[0]
    : res.data;
  return data;
}

export async function addBook(book) {
  const payload = { data_json: { ...book } };
  const res = await api.post("/", payload);
  return res.data;
}

export async function updateBook(id, book) {
  const payload = { data_json: { ...book } };
  const res = await api.put(`/${id}`, payload);
  return res.data;
}

export async function deleteBook(id) {
  const res = await api.delete(`/${id}`);
  return res.data;
}
