<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Navbar from '@/components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

</script>

<template>
  <Navbar />

  <Sidebar />

  <div class="content-wrapper">
    <RouterView />
  </div>

  <aside class="control-sidebar control-sidebar-dark"></aside>
</template>

<style scoped></style>
