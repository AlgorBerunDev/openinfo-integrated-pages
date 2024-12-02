<template>
  <div class="common-layout">
    <el-container>
      <el-main v-loading="loading" class="fact-container">
        <div class="search-bar">
          <el-select
            v-model="report_standard"
            :placeholder="$t('message.nsbu')"
            size="large"
          >
            <el-option
              v-for="item in standardOptions"
              :key="item.value"
              :label="$t(`message.${item.label}`)"
              :value="item.value"
            />
          </el-select>
          <!-- Report Type Select -->
          <el-select
            v-model="report_type"
            :placeholder="$t('message.all')"
            size="large"
          >
            <el-option
              v-for="item in currentReportOptions"
              :key="item.value"
              :label="$t(`message.${item.label}`)"
              :value="item.value"
            />
          </el-select>

          <el-autocomplete
            v-model="factSearchInput"
            :fetch-suggestions="querySearch"
            :placeholder="$t('message.placeholder_for_search')"
            :trigger-on-focus="false"
            class="inline-input w-100"
            clearable
            size="large"
            value-key="full_name_text"
          >
          </el-autocomplete>

          <el-date-picker
            v-model="startDate"
            :picker-options="pickerOptions"
            :placeholder="$t('message.start_date')"
            :shortcuts="shortcuts"
            format="DD.MM.YYYY"
            size="large"
            style="min-width: 200px"
            type="date"
          />
          <el-date-picker
            v-model="endDate"
            :picker-options="pickerOptions"
            :placeholder="$t('message.end_date')"
            :shortcuts="shortcuts"
            format="DD.MM.YYYY"
            size="large"
            style="min-width: 200px"
            type="date"
          />

          <el-button
            size="large"
            style="background-color: #124483; color: #ffffff; padding: 10px"
            @click="fetchData"
          >
            <el-icon size="17" style="vertical-align: middle">
              <Search />
            </el-icon>
            <span style="vertical-align: middle">
              {{ $t('message.Search') }}
            </span>
          </el-button>
          <el-button
            size="large"
            style="
              background-color: red;
              padding: 10px;
              color: #ffffff;
              margin: 0;
            "
            type="danger"
            @click="clearFields"
          >
            <el-icon size="18" style="vertical-align: middle">
              <RefreshLeft />
            </el-icon>
            <span style="vertical-align: middle">
              {{ $t('message.Clear') }}
            </span>
          </el-button>
        </div>

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
              {{ fact.organization_name }}
            </h1>
            <div class="buttons d-flex gap-2 align-items-center">
              <a
                v-if="report_standard === 'main'"
                :href="`https://openinfo.uz/ru/reports/to_pdf${fact.id}/`"
              >
                <img
                  alt="pdfIcon"
                  src="/src/assets/images/icons/pdf-icon2.svg"
                  style="width: 26px"
                />
              </a>

              <a
                v-if="report_standard === 'msfo'"
                :href="`https://openinfo.uz/media/${fact.pdf_file}`"
                download
                target="_blank"
              >
                <img
                  alt="pdfIcon"
                  src="/src/assets/images/icons/pdf-icon2.svg"
                  style="width: 26px"
              /></a>

              <a
                v-if="report_standard === 'audition'"
                :href="`https://openinfo.uz/media/${fact.pdf_file}`"
                download
                target="_blank"
              >
                <img
                  alt="pdfIcon"
                  src="/src/assets/images/icons/pdf-icon2.svg"
                  style="width: 26px"
              /></a>
              <!-- <router-link
                v-if="fact.properties"
                :to="{
                  path: `reports/${fact.properties.org_type}/${fact.properties.report_type}/${fact.object_id}`,
                }"
                class="button-more"
                color="#06AA17"
              >
                {{ $t('message.more') }}
              </router-link> -->
              <a
                v-if="fact.properties"
                target="_blank"
                class="button-more"
                color="#06AA17"
                :href="`/reports/${fact.properties.org_type}_${fact.properties.report_type}/${fact.object_id}/`"
              >
                {{ $t('message.more') }}
              </a>
            </div>
          </div>

          <p v-if="fact.properties" class="fact-title">
            {{ fact.properties.report_title }}
          </p>

          <div class="d-flex justify-content-between flex-wrap gap-1">
            <div class="fact-date-container">
              <p class="fact-date text-primary">
                {{ $t('message.date_recognized') }}
              </p>
              <p class="fact-date d-flex gap-1 align-items-center text-center">
                <el-icon>
                  <Calendar />
                </el-icon>
                {{ moment.utc(fact.pub_date).format('DD.MM.YYYY ') }}
                &nbsp;&nbsp;
                <el-icon>
                  <Clock />
                </el-icon>
                {{ moment.utc(fact.pub_date).format('HH:mm') }}
              </p>
            </div>

            <div v-if="fact.approved_date" class="fact-date-container">
              <p class="fact-date text-primary">
                {{ $t('message.data_approved') }}
              </p>
              <p class="fact-date d-flex gap-1 align-items-center">
                <el-icon>
                  <Calendar />
                </el-icon>
                {{
                  moment.utc(fact.approved_date).format('DD.MM.YYYY ')
                }}&nbsp;&nbsp;
                <el-icon>
                  <Clock />
                </el-icon>
                {{ moment.utc(fact.approved_date).format('HH:mm') }}
              </p>
            </div>
          </div>
        </div>

        <div class="pagination d-flex justify-content-center mb-4">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="10"
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

  const factLists = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
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

  const standardOptions = [
    { value: 'main', label: 'nsbu' },
    { value: 'msfo', label: 'ifrs' },
    { value: 'audition', label: 'audition_results' },
  ]

  const reportOptions = {
    main: [
      { value: '', label: 'all' },
      { value: 'quarter', label: 'quarterly' },
      { value: 'annual', label: 'annual' },
    ],
    msfo: [
      { value: '', label: 'all' },
      { value: '2', label: 'quarterly' },
      { value: '1', label: 'annual' },
    ],
    audition: [
      { value: '', label: 'all' },
      { value: '2', label: 'quarterly' },
      { value: '1', label: 'annual' },
    ],
  }

  const pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now() // Disable future dates
    },
  }

  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => {
        const date = new Date()
        date.setDate(date.getDate() - 1)
        return date
      },
    },
    {
      text: 'Last Week',
      value: () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return date
      },
    },
  ]
  const currentReportOptions = computed(
    () => reportOptions[report_standard.value],
  )

  // Adjust `report_type` when switching between standards
  watch(report_standard, (newStandard) => {
    console.log(report_standard.value, 'reportstandart')
    report_type.value = currentReportOptions.value[0].value
  })

  const fetchData = () => {
    loading.value = true
    http
      .get(`/reports/${report_standard.value}/`, {
        params: {
          pub_date__lte: endDate.value
            ? moment(endDate.value).format('YYYY-MM-DD hh:mm:ss')
            : '',
          pub_date__gte: startDate.value
            ? moment(startDate.value).format('YYYY-MM-DD hh:mm:ss')
            : '',
          search: factSearchInput.value,
          page: currentPage.value,
          report_type: report_type.value,
        },
      })
      .then((response) => {
        factLists.value = response.data.results
        total.value = response.data.count
      })
      .catch(({ response }) => {
        ElNotification({
          type: 'error',
          message: response?.data?.message || t('message.error_fetching_data'),
        })
      })
      .finally(() => {
        loading.value = false
      })
  }

  const clearFields = () => {
    factSearchInput.value = ''
    startDate.value = null
    endDate.value = null
    report_standard.value = standardOptions[0].value
    currentPage.value = 1
    fetchData()
  }

  const handleCurrentChange = (val) => {
    currentPage.value = val
    fetchData()
  }

  const querySearch = debounce((queryString, cb) => {
    http
      .get(`/home/autofill/?name=${queryString}`)
      .then((response) => {
        suggestionsList.value = response.data
        cb(suggestionsList.value)
      })
      .catch(() => cb([]))
  }, 300) // Debounce for 300ms

  onMounted(() => fetchData())

  // Utility for debouncing functions
  function debounce(func, wait) {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }
</script>

<style scoped>
  .fact-container {
    min-height: 100vh;
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*gap: 10px;*/
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
