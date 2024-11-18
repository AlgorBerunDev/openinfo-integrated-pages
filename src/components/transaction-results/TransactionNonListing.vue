<template>
  <div v-loading="loading" class="table-white-header">
    <el-table
      v-if="tradeDataOtc.length"
      v-loading="loading"
      :data="tradeDataOtc"
      style="width: 100%"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      empty-text="Malumotlar Topilmadi"
      :header-cell-style="
        () => ({
          textTransform: 'lowercase',
        })
      "
    >
      <el-table-column
        prop="emitent"
        align="left"
        :label="$t('message.trade.organization')"
        min-width="300"
      >
        <template #default="scope">
          <p style="color: #1256a0">
            {{ scope.row.emitent }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        prop="trade_datetime"
        :label="$t('message.statistics_date')"
        min-width="160"
        align="right"
      >
        <template #default="scope">
          {{
            new Date(scope.row?.trtime)
              ?.toLocaleDateString('ru-RU', timeOptions)
              ?.replace(',', ' | ')
          }}
        </template>
      </el-table-column>

      <el-table-column
        prop="stock"
        :label="$t('message.statistics_isin')"
        align="right"
        width="200"
      />

      <el-table-column
        prop="price"
        :label="$t('message.statistics_torg_tsena')"
        align="right"
        min-width="151"
      >
        <template #default="scope">
          {{ (+scope.row.price).toLocaleString('ru') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        :label="$t('message.statistics_quantity_sb')"
        align="right"
        width="110"
      />
      <el-table-column
        prop="total_value"
        :label="$t('message.statistics_vol_trading')"
        align="right"
        min-width="150"
      >
        <template #default="scope">
          {{ scope.row.total_value.toLocaleString('ru') }}
        </template>
      </el-table-column>
      <!--      </el-table-column>-->
    </el-table>

    <div class="pagination d-flex justify-content-center mt-4 mb-4">
      <el-pagination
        :current-page="currentPage"
        :page-count="totalPages"
        :total="total"
        hide-on-single-page
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import { ElNotification } from 'element-plus'
  import { Search } from '@element-plus/icons-vue'
  import moment from 'moment/moment'
  import http from '@/http'

  const tradeData = ref([])
  const tradeDataOtc = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const totalPages = ref(null)
  const pageSize = 20
  const total = ref(null)
  const factSearchInput = ref('')

  const timeOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
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
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      },
    },
    {
      text: 'A week ago',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      },
    },
  ]

  const startDate = ref(new Date(new Date().setDate(new Date().getDate() - 1)))
  const endDate = ref(new Date())
  const pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now()
    },
  }

  const url = import.meta.env.VITE_APP_SERVER_URL
  const value = ref('Option1')

  const getTradeResults = () => {
    loading.value = true
    http
      .get(`home/trade-results-otc/?page=${currentPage.value}`, {
        params: {
          page_size: '40',
        },
      })
      .then((response) => {
        tradeDataOtc.value = response.data.results
        totalPages.value = response.data?.total_pages
        total.value = response.data.count
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

  const clearFields = () => {
    factSearchInput.value = ''
    startDate.value = null
    endDate.value = null
    selectValue.value = options[0].value
  }

  const handleCurrentChange = (val) => {
    currentPage.value = val
    getTradeResults()
  }

  const getInfoByLang = (stockType) => {
    switch (stockType) {
      case '01':
        return 'Простые акции'
      case '02':
        return 'Прив акции'
      case '':
        return 'Облигации'
      default:
        return '-'
    }
  }

  onMounted(() => {
    getTradeResults()
  })
</script>

<style scoped>
  /*.trade .el-table {*/
  /*  border-radius: 10px!important;*/
  /*}*/

  .trading {
    min-height: 100vh;
    padding-bottom: 20px;
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 100%;
    margin: 0;
  }

  /* #040b50 #040b4ef7  #414243  */
  /*background: linear-gradient(43deg, #4158D0 0%, #C850C0 100%, #ffcc70 100%);*/
</style>
