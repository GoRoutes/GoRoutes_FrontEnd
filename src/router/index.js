import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';
import { HomeView, LoginView, DashboardView, RegisterView} from '@/views';

const routes = [
  {
    path: '/default',
    component: DefaultLayout,
    children: [
      { path: '', component: HomeView },
      { path: 'home', component: HomeView },
      { path: 'dashboard', component: DashboardView },
    ],
  },
  {
    path: '/blank',
    component: BlankLayout,
    children: [
      { path: '', component: LoginView }, 
      { path: 'login', component: LoginView },
      { path: 'register', component: RegisterView }, 
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
