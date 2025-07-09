<template>
  <v-container>
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
      @click=""
      elevation="2"
      v-for="post in posts"
      v-if="!loading && posts.length > 0"
    >
      <v-card-title>My First Post</v-card-title>
      <v-card-text opacity="0.7" class="text-truncate">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis odit, aspernatur, sunt recusandae corporis nisi numquam voluptatum, voluptas itaque corrupti voluptate repudiandae? Architecto cupiditate aliquid hic quasi repudiandae id dicta.
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" prepend-icon="mdi-heart-outline">11k</v-btn>
        <v-btn color="primary" prepend-icon="mdi-comment-outline">11k</v-btn>
      </v-card-actions>
    </v-card>

    <v-card 
      class="mx-auto my-5 d-flex flex-column align-center"
      color="#F1F1F3"
      elevation="0"
      v-if="!loading && posts.length === 0"
    >
      <v-icon icon="mdi-comment-off" size="64" color="#757575"></v-icon>
      <v-card-subtitle>Nenhum post encontrado</v-card-subtitle>
    </v-card>

    <v-skeleton-loader
      class="mx-auto my-5"
      max-width="500px"
      type="article"
      v-for="post in [1,2,3]"
      v-if="loading"
    ></v-skeleton-loader>
  </v-container>
</template>

<script lang="ts" setup>
import { gql } from '@apollo/client/core'
import { useQuery } from '@vue/apollo-composable'
import { ref, watchEffect } from 'vue'

const GET_POSTS = gql`
  query FindAllPosts {
    findAllPosts {
      id
      content
      likes
      createdAt
      updatedAt
      author {
        id
        name
        email
        createdAt
        updatedAt
      }
      comments {
        content
        createdAt
        updatedAt
        author {
          id
          name
          email
          createdAt
          updatedAt
        }
      }
    }
  }
`

const posts = ref<any[]>([])

const { result, loading, error } = useQuery(GET_POSTS)

watchEffect(() => {
  if (result.value) {
    posts.value = result.value.findAllPosts
    console.log(posts.value)
  }
})
</script>
