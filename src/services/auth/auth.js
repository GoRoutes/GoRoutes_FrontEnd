import api from "@/plugins/axios";


class AuthService {
  async login(username, password) {
    try {
      const response = await api.post(`/authentication/token/`, {
        username,
        password,
      });
      return response
    } catch (error) {
      return error
    }
  }
}

export default new AuthService();
