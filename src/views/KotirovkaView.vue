<template>
  <div class="header-container mt-4">
    <h1
      class="header-title p-0 m-0 link-header"
      style="cursor: pointer"
      @click="goToKotirovka"
    >
      {{ $t('message.kotirovka.quotes_title') }}
    </h1>
  </div>
  <div class="calendar">
    <el-tabs
      v-model="activeName"
      class="demo-tabs m-0 p-0"
      @tab-click="handleClick"
    >
      <el-tab-pane :label="$t('message.trade.stock')" name="first">
        <StcokKotirovka />
      </el-tab-pane>
      <el-tab-pane :label="$t('message.trade.bond')" name="second">
        <BondKotirovka />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const activeName = ref('first')

  import { useRouter } from 'vue-router'

  // Initialize the router instance
  const router = useRouter()
  const handleClick = (tab, event) => {
    console.log(tab, event)
  }

  const goToKotirovka = () => {
    router.push('/kotirovka') // Navigates to /kotirovka route
  }
</script>
<style scoped>
  .header-container {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .header-title {
    font-size: 24px;
    color: #000000;
    font-weight: 700;
  }

  .header-title.link-header {
    cursor: pointer;
  }

  .header-title.link-header:hover {
    color: #0c63bb;
  }
</style>

<style>
  .calendar .el-tabs__header .el-tabs__item.is-active {
    color: #1256a0;
  }
</style>
