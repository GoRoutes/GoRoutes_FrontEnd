<script setup>
import { ButtonComp } from "@/components";
import { useRouter } from 'vue-router';
import WaveAnimation from "@/components/auth/WaveAnimation.vue";

const router = useRouter();

const navigateToLogin = () => {
  router.push('/blank/login');
};

const navigateToRegister = () => {
  router.push('/blank/register');
};
</script>

<template>
  <div class="home">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <img src="@/assets/images/LogoRemoved.png" alt="GoRoutes Logo" />
          <h1>GoRoutes</h1>
        </div>
        <div class="nav-buttons">
          <ButtonComp name="ENTRAR" @click="navigateToLogin" padding=".5rem" />
          <ButtonComp name="CADASTRAR" @click="navigateToRegister" padding=".5rem" />
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Aqui você viaja com conforto e segurança</h1>
          <p>Gerencie suas rotas de transporte de forma inteligente e eficiente com a melhor plataforma do mercado</p>
          <div class="hero-buttons">
            <ButtonComp name="COMEÇAR AGORA" @click="navigateToRegister" padding=".8rem" />
          </div>
        </div>
        <div class="hero-animation">
          <div class="animation-container">
            <WaveAnimation />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-content">
        <h2>Soluções para todos</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Motoristas</h3>
            <p>Otimize suas rotas e gerencie seus passageiros com eficiência</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3>Passageiros</h3>
            <p>Acompanhe seu transporte em tempo real e viaje com tranquilidade</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3>Responsáveis</h3>
            <p>Gerencie múltiplos passageiros e mantenha-se informado sobre as rotas</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: #ffffff;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 80px;
  width: auto;
}

.logo h1 {
  color: var(--primary-color);
  font-size: 2.1rem;
  font-family: "Homenaje", sans-serif;
  font-weight: 700;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.hero {
  padding-top: 80px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 3.5rem;
  color: var(--primary-color);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-family: "Homenaje", sans-serif;
}

.hero-text p {
  font-size: 1.25rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-animation {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.animation-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.features {
  padding: 6rem 2rem;
  background: #ffffff;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-content h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 3rem;
  font-family: "Homenaje", sans-serif;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  border-radius: 16px;
}

.feature-icon svg {
  width: 32px;
  height: 32px;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-card p {
  color: var(--secondary-color);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-text h1 {
    font-size: 3rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .header {
    height: auto;
  }

  .header-content {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .hero {
    padding-top: 120px;
  }

  .hero-content {
    padding: 2rem 1rem;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-text p {
    font-size: 1.1rem;
  }

  .features {
    padding: 4rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-content h2 {
    font-size: 2rem;
  }
}
</style>
