<template>
  <Transition name="fade">
    <div v-if="loading" class="splash-screen">
      <div class="spinner" />
      <p>Memuat Halaman...</p>
    </div>
  </Transition>
</template>

<script setup>
import { useLoadingSplashScreen } from '~/composables/useLoadingSplashScreen';

const loading = useLoadingSplashScreen();
</script>

<style scoped>
.splash-screen {
  position: fixed; /* Menutupi seluruh layar */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff; /* Ganti dengan warna background Anda */
  z-index: 9999; /* Pastikan berada di atas segalanya */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
}

/* Animasi Spinner Sederhana */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #007bff; /* Ganti dengan warna primer Anda */
  animation: spin 1s ease infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animasi Transisi Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
