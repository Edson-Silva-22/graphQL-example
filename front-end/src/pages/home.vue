<template>
  <v-container>
    <Alert></Alert>
    <v-text-field
      placeholder="Buscar"
      width="80%"
      max-width="300px"
      class="mx-auto my-5"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      icon-color="primary"
      rounded
      base-color="primary"
      color="primary"
    ></v-text-field>

    <v-card 
      max-width="500px"
      class="mx-auto my-5"
      elevation="2"
      v-for="post in posts"
      v-show="!postStore.loading && posts.length > 0"
      :key="post.id"
    >
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn 
            color="primary" 
            icon="mdi-dots-vertical" 
            variant="text"
            class="position-absolute	right-0"
            v-bind="props"
          ></v-btn>
        </template>

        <v-list>
          <v-list-item @click="router.push(`/update-post/${post.id}`)">Editar</v-list-item>
          <v-list-item @click="removePost(post.id)">Excluir</v-list-item>
        </v-list>
      </v-menu>
      <v-card-text class="pb-0 ">{{ post.author.name }}</v-card-text>
      <v-card-title class="text-wrap">{{ post.title }}</v-card-title>
      <v-card-text 
        opacity="0.7" 
        :class="post.postContentExpand ? '' : 'text-truncate'"
      >{{ post.content }}</v-card-text>

      <v-divider>
        <v-btn 
          color="primary" 
          :icon="post.postContentExpand ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline'" 
          variant="text"
          size="38"
          @click="post.postContentExpand = !post.postContentExpand"
        ></v-btn>
      </v-divider>

      <v-card-actions>
        <v-btn color="primary" prepend-icon="mdi-heart-outline">11k</v-btn>
        <v-btn 
          color="primary" 
          prepend-icon="mdi-comment-outline"
          @click="post.postCommentsExpand = !post.postCommentsExpand"
        >11k</v-btn>
      </v-card-actions>
      
      <v-card-item v-show="post.postCommentsExpand">
        <div 
          v-for="(comment, index) in post.comments" 
          class="mb-5"
          :key="index"
        >
          <v-card-text class="font-weight-bold py-0">{{ comment.author.name }}</v-card-text>
          <v-card-text class="py-2" opacity="0.7">{{ comment.content }}</v-card-text>
        </div>

        <v-textarea
          placeholder="comentar"
          variant="outlined"
          color="primary"
          base-color="primary"
          rounded
          append-inner-icon="mdi-send"
          icon-color="primary"
          @click:append-inner=""
          rows="1"
          max-rows="5"
          auto-grow
          clearable
          glow
          center-affix
        ></v-textarea>
      </v-card-item>
    </v-card>

    <v-card 
      class="mx-auto my-5 d-flex flex-column align-center"
      color="#F1F1F3"
      elevation="0"
      v-if="!postStore.loading && posts.length === 0"
    >
      <v-icon icon="mdi-comment-off" size="64" color="#757575"></v-icon>
      <v-card-subtitle>Nenhum post encontrado</v-card-subtitle>
    </v-card>

    <v-skeleton-loader
      class="mx-auto my-5"
      max-width="500px"
      type="article"
      v-for="post in [1,2,3]"
      v-if="postStore.loading"
    ></v-skeleton-loader>
  </v-container>
</template>

<script lang="ts" setup>
import Alert from '@/components/Alert.vue'
import router from '@/router'
import { useAlertStore } from '@/stores/alert'
import { usePostStore } from '@/stores/post'
import { ref } from 'vue'

const alertStore = useAlertStore()
const postStore = usePostStore()
const posts = ref<any[]>([])

async function findAllPosts() {
  const response = await postStore.findAll()
  posts.value = response.map((post: any) => {
    return {
      ...post,
      postContentExpand: false,
      postCommentsExpand: false,
    }
  })
}

async function removePost(postId: string) {
  const response = await postStore.remove(postId)
  if (response) {
    alertStore.createAlert('Post removido com sucesso!', 'success')
    await findAllPosts()
  }
}

onMounted(async () => {
  await findAllPosts()
})
</script>
