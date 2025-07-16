<template>
  <v-app-bar class="px-2 border-b-sm border-primary" elevation="0" color="#90CAF9">
    <template v-slot:prepend>
      <h1 class="text-primary">Fala Ai</h1>
    </template>

    <template v-slot:append>
      <v-btn 
        icon="mdi-plus"
        color="primary" 
        variant="tonal"
        class="mr-2"
        @click="router.push('/create-post')"
        ></v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn 
            icon="mdi-dots-vertical"
            color="primary" 
            variant="tonal"
            v-bind="props"
            ></v-btn>
          </template>

          <v-list class="mt-2">
            <v-list-item
              prepend-icon="mdi-account"
              @click="router.push('/profile')"
            >Perfil</v-list-item>
            <v-list-item
              prepend-icon="mdi-logout"
              @click="logout"
            >Sair</v-list-item>
          </v-list>
        </v-menu>
        
      </template>
    </v-app-bar>
  </template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

  const router = useRouter()

  async function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }
</script>