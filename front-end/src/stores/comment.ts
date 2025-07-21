import { useApi } from "@/plugins/graphQL-client"
import gql from "graphql-tag"

export const useCommentStore = defineStore('comment', () => {
    const loading = ref(false)
    const CREATE_COMMENT = gql`
      mutation CreateComment($post: String!, $content: String!) {
        createComment(createCommentInput: { post: $post, content: $content }) {
          id
          author {
            id
            name
            email
            createdAt
            updatedAt
          }
          content
          createdAt
          updatedAt
        }
      }
    `
    
    async function create(post: string, content: string) {
      loading.value = true
      const response = await useApi('mutate', CREATE_COMMENT, { post, content })
      loading.value = false
      return response.createComment
    }

    return {
      create,
      loading
    }
})