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
    <Facts v-if="activeReport === 'openinfo'" />
    <UzseFacts v-if="activeReport === 'uzse'" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  import Facts from '@/views/Facts.vue'
  import UzseFacts from '@/views/UzseFacts.vue'
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
