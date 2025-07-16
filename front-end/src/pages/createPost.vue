<template>
  <v-container>
    <v-card class="pa-3">
      <v-card-title class="px-0">Nova Publicação</v-card-title>

      <v-text-field
        name="Título"
        label="Título"
        variant="outlined"
        color="primary"
        base-color="primary"
        v-model="title"
      ></v-text-field>

      <v-textarea 
        placeholder="O que voçê quer compartilhar?" 
        variant="outlined"
        color="primary"
        base-color="primary"
        v-model="content"
      ></v-textarea>

      <v-card-actions>
        <v-btn 
          color="primary" 
          variant="tonal" 
          @:loading="postStore.loading"
          @click="createPost"
        >Publicar</v-btn>
        <v-btn color="error" @click="router.back()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { usePostStore } from '@/stores/post'


  const postStore = usePostStore()
  const router = useRouter()
  const title = ref('')
  const content = ref('')
  
  async function createPost() {
    const response = await postStore.create(title.value, content.value)
    router.push('/')
  }
</script>