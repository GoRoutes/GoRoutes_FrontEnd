<template>
  <div class="wave-container">
    <div class="geometric-elements">
      <div class="circle"></div>
      <div class="square"></div>
      <div class="triangle"></div>
    </div>
    <div class="waves">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>
    <div class="dots">
      <div class="dot" v-for="i in 6" :key="i"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaveAnimation'
}
</script>

<style scoped>
.wave-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.05) 0%, rgba(var(--secondary-color-rgb), 0.1) 100%);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.geometric-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.circle, .square, .triangle {
  position: absolute;
  opacity: 0.15;
  animation: float 6s ease-in-out infinite;
}

.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--primary-color);
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.square {
  width: 60px;
  height: 60px;
  background: var(--secondary-color);
  top: 40%;
  right: 25%;
  animation-delay: 2s;
  transform: rotate(45deg);
}

.triangle {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid var(--comment-color);
  top: 30%;
  left: 60%;
  animation-delay: 4s;
}

.waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(transparent 60%, var(--primary-color));
  opacity: 0.1;
  border-radius: 50%;
  animation: wave 8s linear infinite;
}

.wave2 {
  animation-delay: -2s;
  opacity: 0.15;
  height: 90%;
}

.wave3 {
  animation-delay: -4s;
  opacity: 0.05;
  height: 80%;
}

.dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--secondary-color);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.dot:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.dot:nth-child(2) { top: 60%; left: 20%; animation-delay: 0.5s; }
.dot:nth-child(3) { top: 40%; left: 40%; animation-delay: 1s; }
.dot:nth-child(4) { top: 30%; left: 60%; animation-delay: 1.5s; }
.dot:nth-child(5) { top: 70%; left: 70%; animation-delay: 2s; }
.dot:nth-child(6) { top: 50%; left: 80%; animation-delay: 2.5s; }

@keyframes wave {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.6;
  }
}
</style>
