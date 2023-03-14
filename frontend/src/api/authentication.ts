import { LoginUser, RegisterUser } from "../schemas/userSchemas";
import { client } from "./client";

const BASE_URL = "/authentication";

export async function login(data: LoginUser) {
  const response = await client.post(`${BASE_URL}/login`, data);
  return response.data;
}

export async function register(data: RegisterUser) {
  const response = await client.post(`${BASE_URL}/register`, data);
  return response.data;
}
