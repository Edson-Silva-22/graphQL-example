<template>
  <v-container>
    <h1>Publicações</h1>
    
    <v-card v-for="post in posts" :key="post.id">
      <v-card-title>
        title
      </v-card-title>
    </v-card>
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
