import { client } from "./client";

const BASE_URL = "/conversations";

export async function listChats() {
  const response = await client.get(`${BASE_URL}/list`);
  return response.data ?? [];
}
