// services/ProductService.ts

import axios from "axios";

export const ProductService = {
  getAll: () =>
    axios
      .get("http://localhost:3002/api/v1/products/get")
      .then((res) => res.data),
  getById: (id: string) =>
    axios
      .get(`http://localhost:3002/api/v1/products/get/${id}`)
      .then((res) => res.data),
};
