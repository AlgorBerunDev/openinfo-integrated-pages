<template>
  <div class="calendar">
    <el-select
      v-model="activeReport"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <MainReports v-if="activeReport === 'openinfo'" />
    <UzseReports v-if="activeReport === 'uzse'" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import MainReports from '../information disclosure/reports-all/MainReports.vue'
  import UzseReports from '../information disclosure/reports-all/UzseReports.vue'
  const activeReport = ref('openinfo')

  const options = [
    {
      value: 'openinfo',
      label: 'Openinfo',
    },
    {
      value: 'uzse',
      label: 'Uzse',
    },
  ]
</script>
