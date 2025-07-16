import { defineStore } from "pinia";
import gql from "graphql-tag";
import { useApi } from "@/plugins/graphQL-client";

export const usePostStore = defineStore("post", () => {
  const loading = ref(false);
  const GET_POSTS = gql`
    query FindAllPosts {
      findAllPosts {
        id
        title
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
  `;
  const CREATE_POST = gql`
    mutation CreatePost($title: String!, $content: String!) {
      createPost(createPostInput: { title: $title, content: $content }) {
        id
        title
        content
        createdAt
        updatedAt
      }
    }
  `
  const UPDATE_POST = gql`
    mutation UpdatePost($postId: String!, $title: String, $content: String) {
      updatePost(updatePostInput: { postId: $postId, title: $title, content: $content }) {
          id
          title
          content
          createdAt
          updatedAt
      }
    }
  `
  const GET_POST = gql`
    query FindOnePost($id: String!) {
      findOnePost(id: $id) {
          id
          title
          content
          createdAt
          updatedAt
      }
    }
  `
  const REMOVE_POST = gql`
    mutation removePost($id: String!) {
      removePost(id: $id)
    }
  `

  async function create(title: string, content: string) {
    loading.value = true;
    const response = await useApi("mutate", CREATE_POST, { title, content });
    loading.value = false;
    return response.createPost
  }

  async function findAll() {
    loading.value = true;
    const response = await useApi("query", GET_POSTS, undefined, "no-cache");
    loading.value = false;
    return response.findAllPosts
  }

  async function findOne(postId: string) {
    loading.value = true;
    const response = await useApi("query", GET_POST, { id: postId });
    loading.value = false;
    return response.findOnePost
  }

  async function update(postId: string, title: string, content: string) {
    loading.value = true;
    const response = await useApi("mutate", UPDATE_POST, { postId, title, content });
    loading.value = false;
    return response.updatePost
  }

  async function remove(postId: string) {
    loading.value = true;
    const response = await useApi("mutate", REMOVE_POST, { id: postId });
    loading.value = false;
    return response
  }

  return {
    create,
    findAll,
    findOne,
    update,
    remove,
    loading,
  }
});
