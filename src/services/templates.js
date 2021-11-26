import http from "../http-common";

class TemplatesDataService {
  getAll() {
    return http.get();
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
}

  create(data) {
    return http.post("/", data);
  }

  delete(id) {
    return http.delete(`?productId=${id}`);
  }
}

export default new TemplatesDataService();
