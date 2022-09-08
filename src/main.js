import { createApp } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
import { createMetaManager } from 'vue-meta';
import '@/assets/stylesheets/base.scss';
import 'normalize.css';
import App from './App.vue';

const pinia = createPinia();
const metaManager = createMetaManager();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(metaManager);

app.mount('#app');
