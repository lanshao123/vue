import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

import studentList from "./components/sutdent/studentList";
import teacherList from "./components/teacher/teacherList";
import teacherAdd from "./components/teacher/teacherAdd";

var router = new VueRouter({
  routes: [
    { path: '/studentList', component: studentList },
    { path: '/teacherList', component: teacherList },
    { path: '/teacherAdd', component: teacherAdd },
    { path: '/teacherEdit/:id', component: teacherAdd }
  ]
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
