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

  async registerDriver(data) {
    try {
      const response = await api.post(`/authentication/drivers/`, data);
      return response
    } catch (error) {
      return error
    }
  }

  async registerPassenger(data) {
    try {
      const response = await api.post(`/authentication/passengers/`, data);
      return response
    } catch (error) {
      return error
    }
  }

  async registerResponsible(data) {
    try {
      const response = await api.post(`/authentication/responsibles/`, data);
      return response
    } catch (error) {
      return error
    }
  }
}

export default new AuthService();
