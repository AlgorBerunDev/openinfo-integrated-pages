<template>
  <div class="search-bar uzse-facts">
    <el-select
      v-model="factNumber"
      size="large"
      class="uzse-facts"
      :placeholder="$t('message.all')"
    >
      <el-option
        v-for="item in factNumbers"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="factSearchInput"
      filterable
      reserve-keyword
      :placeholder="$t('message.placeholder_for_search')"
      :loading="loading"
      :filter-method="customFilter"
      style="min-width: 300px"
      size="large"
    >
      <el-option
        v-for="item in filteredOptions"
        :key="item.isu_cd"
        :label="item.isu_nm"
        :value="item.isu_cd"
      >
        <template #default>
          <p class="d-flex align-items-center">
            {{ item.isu_nm }} &nbsp;
            <el-tag size="small">{{ item.isu_srt_cd }}</el-tag>
          </p>
        </template>
      </el-option>
    </el-select>

    <el-button
      :icon="Search"
      color="#124483"
      style="margin: 0"
      type="success"
      size="large"
      @click="getFacts"
    >
      {{ $t('message.Search') }}
    </el-button>
    <el-button color="red" style="margin: 0" size="large" @click="clearFields">
      {{ $t('message.Clear') }}</el-button
    >
  </div>

  <div v-loading="loading" class="fact-container">
    <el-empty v-if="!factLists.length"></el-empty>

    <div v-for="fact in factLists" class="facts-list">
      <div class="d-flex justify-content-between align-items-center">
        <h1 class="organization-in-facts fw-bold">
          <span style="font-weight: 300; font-size: 16px">
            {{ 'Fact № ' + fact.sequence }}:
          </span>
          {{ fact.issuer_name }}
        </h1>
        <div class="buttons d-flex gap-3 align-items-center">
          <a target="_blank" :href="`/${fact.report_url}`" class="button-more">
            {{ $t('message.more') }}
          </a>
        </div>
      </div>

      <p class="fact-title">{{ fact.subject }}</p>

      <div class="d-flex justify-content-between">
        <div class="d-flex gap-3 align-items-center">
          <p class="fact-date text-primary">
            {{ $t('message.date_recognized') }}
          </p>
          <p class="fact-date d-flex gap-1 align-items-center text-center">
            <el-icon>
              <Calendar />
            </el-icon>
            {{ moment.utc(fact.date).format('DD.MM.YYYY ') }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="factLists.length"
    class="pagination d-flex justify-content-center mb-4"
  >
    <el-pagination
      :current-page="currentPage"
      :page-count="totalPages"
      :page-size="pageSize"
      :total="total"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import axios from 'axios'
  import { Calendar, Clock, Download, Search } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus'

  import moment from 'moment'

  import { useRoute, useRouter } from 'vue-router'
  import options from '../components/options'
  import { useStore } from '@/stores/store'
  import http from '@/http'

  const factLists = ref([])
  const organizationNames = ref([])
  const factNumbers = ref([])
  const url = import.meta.env.VITE_APP_SERVER_URL
  const downloadUrl = import.meta.env.VITE_APP_DOWNLOAD_URL

  const dateValue = ref(null)
  const route = useRoute()
  const router = useRouter()
  const selectValue = ref(options[0].value)
  const loading = ref(false)

  const totalPages = ref(null)
  const total = ref(null)

  const results = ref([])
  const factNumber = ref(null)
  const pageSize = ref(10)
  const factSearchInput = ref('')
  const suggestionsList = ref([])

  const selectChange = () => {
    currentPage.value = 1
    getFacts()
  }

  const store = useStore()

  const querySearch = (queryString, cb) => {
    http
      .get(`/home/autofill/?name=${queryString}`)
      .then((response) => {
        suggestionsList.value = response.data

        // call callback function to return suggestions
        cb(suggestionsList.value)
      })
      .catch((err) => {
        console.log(err, 'error')
      })
  }

  const getFacts = () => {
    loading.value = true
    axios
      .get(`/uzseapi/reports/material_facts.json`, {
        params: {
          title_id: factNumber.value,
          search_key: factSearchInput.value,
        },
      })
      .then((response) => {
        factLists.value = response.data.results
        total.value = response.data.meta.total_count
        pageSize.value = response.data.meta.per_page
        factNumbers.value = response.data.meta.titles
      })
      .catch(({ response }) => {
        ElNotification({
          type: 'error',
          message: response.data.message || 'Malumot olishda xatolik bor!',
        })
      })
      .finally(() => {
        loading.value = false
      })
  }

  const getOrganizationNames = () => {
    axios
      .get(`/uzseapi/isu_infos/names_json.json`, {
        params: {
          mkt_id: 'STK',
        },
      })
      .then((response) => {
        organizationNames.value = response.data.data
        console.log(organizationNames.value, 'sss')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const currentPage = ref(1)
  const handleCurrentChange = (val) => {
    currentPage.value = val
    getFacts()
  }

  // Filtered options computed property
  const filteredOptions = computed(() => {
    if (!factSearchInput.value) return organizationNames.value

    const query = factSearchInput.value.toLowerCase()
    return organizationNames.value.filter((item) => {
      return (
        item.isu_nm.toLowerCase().includes(query) ||
        item.isu_cd.toLowerCase().includes(query) ||
        item.isu_srt_cd.toLowerCase().includes(query)
      )
    })
  })

  // Custom filter method (not strictly necessary anymore)
  const customFilter = (query) => {
    factSearchInput.value = query // Bind search input to filter query
  }

  const clearFields = () => {
    currentPage.value = 1
    factSearchInput.value = ''
    factNumber.value = ''
  }

  onMounted(() => {
    getOrganizationNames()
    getFacts()
  })
</script>

<style scoped>
  .fact-container {
    min-height: 80vh;
  }

  .header-name {
    /* background: #124483; */
    border-radius: 10px;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #124483;
    gap: 20px;
  }

  .facts-list {
    display: flex;
    color: #5c5c5c;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .organization-in-facts {
    margin: 0;
    color: #124483;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .search-bar {
    display: flex;
    margin: 20px 0;
    gap: 10px;
  }

  .fact-date {
    font-size: 14px;
  }
</style>

<style>
  .el-select-dropdown {
    max-width: 80vw;
  }
</style>
