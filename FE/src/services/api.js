import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000"; // chỉnh nếu cần

const api = axios.create({
  baseURL: API_BASE + "/api", // hoặc '/' nếu server không có prefix
  timeout: 10000,
});

export async function fetchProducts(params = {}) {
  const res = await api.get("/products", { params }); // kiểm tra route thực tế trong api/routes
  // trả về mảng sản phẩm: thích hợp với res.data hoặc res.data.items tuỳ server
  return res.data?.items ?? res.data;
}

export default api;
