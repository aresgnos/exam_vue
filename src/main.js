import { createApp } from 'vue'
import App from './App.vue'

// router 설정
import routes from './routes/index.js';

//element-plus 설정 (최신버전인 1.3 버전 말고(remove) 1.2버전 받음.)
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);

app.use(routes);
app.use(ElementPlus);

app.mount('#app');
