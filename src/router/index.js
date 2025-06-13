import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';
import { HomeView, LoginView, DashboardView, RegisterView} from '@/views';
import { useAuthStore } from '@/stores';

const routes = [
  {
    path: '/default',
    component: DefaultLayout,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.state.isLogged) {
      next('/blank/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
