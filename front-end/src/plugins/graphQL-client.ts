// src/apolloClient.js
import { useAlertStore } from "@/stores/alert";
import { ApolloClient, ApolloError, ApolloLink, concat, createHttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql", // a URL da API GraphQL
})

// Middleware para adicionar o token de autenticação no cabeçalho da requisição
const authMiddleware = new ApolloLink((operation, forward) => {
  // Adiciona o token de autenticação no cabeçalho da requisição
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}` || null
    }
  })
  return forward(operation);
})

const apolloClient = new ApolloClient({ 
  // concat combina o middleware de autenticação com o link HTTP
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

export async function useApi(type: 'mutate' | 'query', query: any, variables?: any, fetchPolicy?: 'cache-first' | 'cache-only' | 'network-only' | 'no-cache' | 'standby') {
  const alertStore = useAlertStore()
  try {
    let result
    if (type === 'mutate') {
      result = await apolloClient.mutate({
        mutation: query,
        variables,
      })
    }

    if  (type === 'query') {
      result = await apolloClient.query({
        query: query,
        variables,
        fetchPolicy
      })
    }

    return result?.data
  } catch (error: ApolloError | any) {
    console.error(error)
    if (error) alertStore.createAlert(error.message, "error")
  }
}

// exportamos pra usar nas outras partes do app
export default apolloClient;
