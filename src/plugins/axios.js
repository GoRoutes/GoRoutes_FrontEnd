import axios from "axios";
import { useLoadingStore } from "@/stores";
import { AuthService } from '@/services';

const API_URL = import.meta.env.VITE_API_URL + "/";


const api = axios.create({
  baseURL: API_URL?.endsWith("/") ? API_URL.slice(0, -1) : API_URL,
});

api.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore();
  loadingStore.startLoading();

  // Adiciona o token de autenticação no header se existir
  const authData = JSON.parse(localStorage.getItem('auth') || '{}');
  if (authData.token) {
    config.headers.Authorization = `Bearer ${authData.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();
    return response;
  },
  async (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.stopLoading();

    // Verifica se o erro é de autenticação (401)
    if (error.response?.status === 401) {
      const authData = JSON.parse(localStorage.getItem('auth') || '{}');

      // Tenta fazer refresh do token se houver um refresh token
      if (authData.refresh_token) {
        try {
          const response = await AuthService.refreshToken(authData.refresh_token);
          if (response.data?.access) {
            // Atualiza o token no localStorage
            authData.token = response.data.access;
            localStorage.setItem('auth', JSON.stringify(authData));

            // Refaz a requisição original com o novo token
            error.config.headers.Authorization = `Bearer ${response.data.access}`;
            return axios(error.config);
          }
        } catch (refreshError) {
          // Se falhar o refresh, limpa os dados e redireciona para login
          console.error(refreshError)
          localStorage.removeItem('auth');
          if (window.location.pathname !== '/blank/login') {
            window.location.href = '/blank/login';
          }
        }
      } else {
        // Se não houver refresh token, limpa os dados e redireciona para login
        localStorage.removeItem('auth');
        if (window.location.pathname !== '/blank/login') {
          window.location.href = '/blank/login';
        }
      }
    }

    return Promise.reject(error);
  }
);


export default api;
