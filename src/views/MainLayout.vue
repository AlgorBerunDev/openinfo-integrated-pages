<template>
  <div class="wrapper">
    <el-container class="container-layout">
      <el-container class="layout-content">
        <el-main class="main-section">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup></script>

<style scoped>
  .container-layout {
    position: relative;
    min-height: 100vh;
  }

  .sticky-navbar {
    position: sticky;
    top: 0; /* Height of your Header component */
    z-index: 999; /* Adjust the z-index as needed */
  }
</style>
