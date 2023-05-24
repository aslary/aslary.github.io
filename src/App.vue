<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue';
import router from './router';

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "F1") {
      router.push('/game')
    }
  })
})
</script>

<template>
  <Navbar />

  <RouterView />

  <div class="tui-statusbar" style="margin-top: 20px">
    <ul>
      <li>
        <RouterLink to="/game"><span class="red-168-text">F1</span> Secret Game</RouterLink>
      </li>
    </ul>
  </div>
</template>
