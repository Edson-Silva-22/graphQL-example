<template>
  <v-container>
    <v-card class="pa-3">
      <v-card-title class="px-0">Editar Publicação</v-card-title>

      <v-text-field
        name="Título"
        label="Título"
        variant="outlined"
        color="primary"
        base-color="primary"
        v-model="post.title"
      ></v-text-field>

      <v-textarea 
        placeholder="O que voçê quer compartilhar?" 
        variant="outlined"
        color="primary"
        base-color="primary"
        v-model="post.content"
      ></v-textarea>

      <v-card-actions>
        <v-btn 
          color="primary"
          variant="tonal" 
          :loading="postStore.loading"
          @click="updatePost"
        >Publicar</v-btn>
        <v-btn color="error" @click="router.back()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'

  const postStore = usePostStore()
  const router = useRouter()
  const route = useRoute()
  const { postId } = route.params as { postId: string }
  const post = ref<{
    title: string
    content: string
  }>({
    title: '',
    content: '',
  })

  async function findOnePost() {
    const response = await postStore.findOne(postId)
    post.value = {...response}
  }

  async function updatePost() {
    const response = await postStore.update(postId, post.value.title, post.value.content)

    if (response) router.push('/')
  }

  onMounted(async () => {
    await findOnePost()
  })
</script>