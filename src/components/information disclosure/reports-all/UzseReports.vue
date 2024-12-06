<template>
  <div class="common-layout">
    <div class="search-bar">
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
        size="large"
        style="margin: 0"
        type="success"
        @click="fetchData"
      >
        {{ $t('message.Search') }}
      </el-button>
      <el-button
        color="red"
        size="large"
        style="margin: 0"
        @click="clearFields"
      >
        {{ $t('message.Clear') }}</el-button
      >
    </div>
    <el-container>
      <el-main v-loading="loading" class="fact-container">
        <el-empty v-if="!factLists.length"></el-empty>

        <div v-for="fact in factLists" class="facts-list">
          <div class="d-flex justify-content-between align-items-center">
            <h1
              class="organization-in-facts fw-bolds"
              @click="
                router.push({
                  name: 'company-profile',
                  params: { id: fact.organization },
                })
              "
            >
              {{ fact.issuer_name }}
            </h1>
            <div class="buttons d-flex gap-2 align-items-center">
              <a
                target="_blank"
                class="button-more"
                color="#06AA17"
                :href="`${fact.report_url}`"
              >
                {{ $t('message.more') }}
              </a>
            </div>
          </div>

          <div class="fact-date-container">
            <p class="fact-title">
              {{ fact?.report_type }}
            </p>
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

        <div class="pagination d-flex justify-content-center mb-4">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :background="true"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { ElNotification } from 'element-plus'
  import {
    Calendar,
    Clock,
    RefreshLeft,
    Search,
    ArrowDown,
  } from '@element-plus/icons-vue'

  import moment from 'moment'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import http from '@/http'
  import axios from 'axios'

  const factLists = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const startDate = ref(null)
  const endDate = ref(null)
  const factSearchInput = ref('')
  const total = ref(0)
  const report_standard = ref('main')
  const report_type = ref('')
  const suggestionsList = ref([])
  const url = import.meta.env.VITE_APP_SERVER_URL
  const { t } = useI18n()
  const router = useRouter()

  const organizationNames = ref([])

  const fetchData = () => {
    loading.value = true
    axios
      .get(`/reports/financials.json`, {
        params: {
          page: currentPage.value,
          search_key: factSearchInput.value,
        },
      })
      .then((response) => {
        factLists.value = response.data.results
        total.value = response.data.meta.total_count
        pageSize.value = response.data.meta.per_page
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      .finally(() => {
        loading.value = false
      })
  }

  const clearFields = () => {
    factSearchInput.value = ''
    currentPage.value = 1
    fetchData()
  }

  const handleCurrentChange = (val) => {
    currentPage.value = val
    fetchData()
  }

  const getOrganizationNames = () => {
    axios
      .get(`/isu_infos/names_json.json`, {
        params: {
          mkt_id: 'STK',
        },
      })
      .then((response) => {
        organizationNames.value = response.data.data
      })
      .catch((err) => {
        console.log(err)
      })
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

  onMounted(() => {
    fetchData()
    getOrganizationNames()
  })
</script>

<style scoped>
  .fact-container {
    min-height: 100vh;
    height: 100%;
  }

  .header-name {
    /* background: #124483; */
    border-radius: 10px;
    color: #fff;
    text-align: center;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #124483;
    gap: 20px;
    text-transform: uppercase !important;
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
    border-bottom: 1px solid #ddd;
    padding-bottom: 12px;
    margin: 20px 0;
  }

  .organization-in-facts {
    margin: 0;
    color: #124483;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
    /*text-transform: uppercase;*/
  }

  .organization-in-facts:hover {
    color: #0c63bb;
    /*text-transform: uppercase;*/
  }

  .fact-date-container {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }

  .fact-date {
    font-size: 14px;
  }

  .fact-title {
    width: 80%;
  }

  @media (max-width: 1600px) {
    .fact-date-container {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    html {
      font-size: 14px;
    }
  }

  .header-name {
    /* background: #124483; */
    border-radius: 10px;
    color: #fff;
    text-align: center;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #124483;
    gap: 20px;
    text-transform: uppercase !important;
  }
</style>
