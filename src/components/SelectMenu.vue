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
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

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

  // Initialize selectedReport based on current route
  const selectedReport = ref(null)

  // Function to find label by route
  const findLabelByRoute = (route) => {
    const allReports = { ...quarterlyReports, ...annualReports }
    return (
      Object.entries(allReports).find(([_, path]) => path === route)?.[1] ||
      null
    )
  }

  // Set initial value based on current route
  onMounted(() => {
    selectedReport.value = route.path
    // If the current route exists in our options, select it
    if (!findLabelByRoute(route.path)) {
      // If current route is not in options, you might want to set a default
      selectedReport.value = '/reports/jsc/quarter' // or any other default route
    }
  })

  // Navigate to the selected report
  const navigateToReport = (route) => {
    if (route) {
      router.push(route)
    }
  }
</script>
