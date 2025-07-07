// src/apolloClient.js
import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql", // a URL da API GraphQL
})

// Middleware para adicionar o token de autenticação no cabeçalho da requisição
const authMiddleware = new ApolloLink((operation, forward) => {
  // Adiciona o token de autenticação no cabeçalho da requisição
  operation.setContext({
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODM5YWFhYjFlNTdkZjI0NzFkMzQxODkiLCJ1c2VybmFtZSI6IkFsZXgiLCJpYXQiOjE3NDg4ODk2MTl9.o2Pebbn9_r4Ct3RztFqJtALLWy85M3iUkuxJnjj-HGo'
    }
  })
  return forward(operation);
})

const apolloClient = new ApolloClient({ 
  // concat combina o middleware de autenticação com o link HTTP
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

// exportamos pra usar nas outras partes do app
export default apolloClient;
