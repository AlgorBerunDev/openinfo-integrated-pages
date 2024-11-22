<template>
  <div>
    <el-select
      v-model="selectedReport"
      style="width: 200px"
      size="large"
      placeholder="Choose a report"
      @change="navigateToReport"
    >
      <!-- Quarterly Reports -->
      <el-option-group label="Quarterly Reports">
        <el-option
          v-for="(route, label) in quarterlyReports"
          :key="route"
          :label="label"
          :value="route"
        />
      </el-option-group>

      <!-- Annual Reports -->
      <el-option-group label="Annual Reports">
        <el-option
          v-for="(route, label) in annualReports"
          :key="route"
          :label="label"
          :value="route"
        />
      </el-option-group>
    </el-select>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const selectedReport = ref(null)

  // Define routes for Quarterly Reports
  const quarterlyReports = {
    'Join Stock Companies': '/reports/jsc/quarter',
    Banks: '/reports/bank/quarter',
    'Insurance Companies': '/reports/insurance/quarter',
    IFRS: '/reports/msfo/quarter',
  }

  // Define routes for Annual Reports
  const annualReports = {
    'Join Stock Companies': '/reports/jsc/annual',
    Banks: '/reports/bank/annual',
    'Insurance Companies': '/reports/insurance/annual',
    IFRS: '/reports/msfo/annual',
    'Audition Results': '/reports/audition/annual',
  }

  // Navigate to the selected report
  const navigateToReport = (route) => {
    if (route) {
      router.push(route)
    }
  }
</script>
