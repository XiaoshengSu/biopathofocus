import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

async function bootstrap() {
  const app = createApp(App)

  if (import.meta.env.DEV && import.meta.env.VITE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

bootstrap()
