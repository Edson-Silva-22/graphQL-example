/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
import { provideApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/graphQL-client'

const app = createApp(App)
// Provide do Apollo Client
provideApolloClient(apolloClient)

registerPlugins(app)

app.mount('#app')
