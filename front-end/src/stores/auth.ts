import { defineStore } from "pinia";
import gql from "graphql-tag";
import { useApi } from "@/plugins/graphQL-client";

export const useAuthStore = defineStore("auth", () => {
  const userAuth = ref<{
    sub: string
    username: string
  } | null>(null);
  const loading = ref(false);
  const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
      login(createAuthInput: { email: $email, password: $password }) {
        token
      }
    }
  `;

  async function login(email: string, password: string) {
    loading.value = true;
    const response = await useApi("mutate", LOGIN_USER, { email, password });
    
    if (response.login.token) {
      localStorage.setItem("token", response.login.token);
      return true;
    }

    loading.value = false;
    return false;
  }

  async function logout() {
    localStorage.removeItem("token");
  }

  return {
    login,
    logout,
    loading,
  };
});
