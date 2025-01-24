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
        :label="$t(`message.${item.label}`)"
        :value="item.value"
      />
    </el-select>
    <MainAnnouncements v-if="activeReport === 'openinfo'" />
    <UzseAnnouncements v-if="activeReport === 'uzse'" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  import MainAnnouncements from '@/components/information disclosure/announcements/MainAnnouncements.vue'
  import UzseAnnouncements from '@/components/information disclosure/announcements/UzseAnnouncements.vue'
  const activeReport = ref('openinfo')

  const options = [
    {
      value: 'openinfo',
      label: 'openinfo_title',
    },
    {
      value: 'uzse',
      label: 'uzse_title',
    },
  ]
</script>
