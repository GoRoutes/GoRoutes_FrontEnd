<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo" @click="goToHome">
        <img src="../../assets/images/LogoRemoved.png" width="80px" alt="">
        <h1 style="font-family: Homenaje;">GoRoutes</h1>
      </div>
      <div class="nav-links" v-if="!authStore.state.token">
        <router-link to="/blank/login" class="nav-link">Login</router-link>
        <router-link to="/blank/register" class="btn-register">Cadastre-se</router-link>
      </div>
      <div class="nav-links" v-else>
        <NavBarHome />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import NavBarHome from '@/components/global/NavBarHome.vue'

const router = useRouter()
const authStore = useAuthStore()

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.logo {
  display: flex;
  align-items: center;
  color: var(--primary);
  font-weight: 700;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.logo:hover {
  transform: scale(1.05);
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--primary);
}

.btn-register {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.btn-register::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-register:hover::before {
  left: 100%;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
  }

  .btn-register{
    display: none;
  }

  .nav-link {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}
}
</style>