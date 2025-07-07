<template>
  <v-container class="d-flex align-center justify-center h-100">
    <v-card 
      class="pa-5"
      width="400"
    >
      <h1 class="mb-5">Login</h1>
      <v-form class="d-flex flex-column align-center ga-5">
        <v-text-field
          name="email"
          label="Email"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          color="primary"
          width="100%"
          clearable
          v-model="email"
        ></v-text-field>

        <v-text-field
          name="password"
          label="Senha"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :type="passwordVisible ? 'text' : 'password'"
          color="primary"
          width="100%"
          :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="passwordVisible = !passwordVisible"
          clearable
          v-model="password"
        ></v-text-field>  

        <v-btn 
          color="primary"
          height="56"
          width="150"
          @click="login"
        >Entrar</v-btn>

        <a
          href="/cadastro" 
          class="text-primary font-weight-bold text-decoration-none"
        >Realizar cadastro</a>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@vue/apollo-composable';

  const router = useRouter();
  const passwordVisible = ref(false);
  const email = ref('');
  const password = ref('');

  const LOGIN_USER = gql`
    mutation Login ($email: String!, $password: String!) {
      login(createAuthInput: { email: $email, password: $password }) {
        token
      }
    }
  `
  const { mutate } = useMutation(LOGIN_USER);

  // onDone((result) => {
  //   console.log(result);
  //   if (result.data.login.token) {
  //     localStorage.setItem('token', result.data.login.token);
  //     router.push('/');
  //   } else {
  //     alert('Login failed. Please check your credentials.');
  //   }
  // })

  // onError((err) => {
  //   console.error(err)
  //   alert("Erro na autenticação.");
  // });

  async function login() {
    const result = await mutate({
      email: email.value,
      password: password.value
    });
    
    if (result!.data.login.token) {
      localStorage.setItem('token', result!.data.login.token);
      router.push('/');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }
</script>

<style>

</style>