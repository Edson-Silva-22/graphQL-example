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
        ></v-btn>
        
        <v-btn 
        icon="mdi-account"
        color="primary" 
        variant="tonal"
        ></v-btn>
      </template>
    </v-app-bar>
  </template>

<script setup lang="ts">
</script>