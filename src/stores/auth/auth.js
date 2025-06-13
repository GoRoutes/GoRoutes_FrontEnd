import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { AuthService } from "@/services";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const state = useStorage("auth", {
    user: {},
    isLogged: false,
    error: false,
    //type: '',
    token: '',
    message: ''
  })

  async function login(username, password) {
    try {
      const response = await AuthService.login(username, password);
      console.log(response)

      state.value.token = response.data.access;
      state.value.isLogged = true;
      state.value.user = response.data.user;

      // Redirecionar para o dashboard após login bem-sucedido
      router.push('/default/dashboard');
    } catch (error) {
      state.error = true;
      state.message = error.message || "Erro ao fazer login";
    }
  }

  async function register(data) {
    try {
      const response = await AuthService.registerResponsible(data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async function logout() {
    state.token = '';
    state.isLogged = false;
    state.user = {};
    state.error = false;
    state.message = '';
    router.push('/blank/login');
  }

  return {
    state,
    login,
    logout,
    register
  }
});
