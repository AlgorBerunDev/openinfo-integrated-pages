import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../components/404/PageNotFound.vue'
import MainLayout from '../views/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: 'home',
        },
        {
          path: '/',
          redirect: 'home',
        },
        {
          path: '/en',
          redirect: { name: 'home' },
        },
        {
          path: '/ru',
          redirect: { name: 'home' },
        },
        {
          path: '/uz',
          redirect: { name: 'home' },
        },
        {
          path: '/home',
          name: 'home',
          components: {
            default: () => import('../views/HomeView.vue'),
            SideComponent: () =>
              import('../components/RightSideComponentWithNews.vue'),
          },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
        },

        {
          path: '/facts',
          name: 'facts',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () => import('../views/Facts.vue'),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/facts/:id/:factId',
          name: 'facts-detailed',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () => import('../views/FactsMore.vue'),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/ao',
          name: 'jsc-quarterly',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () => import('../components/JSCbyQuarter.vue'),
            SideComponent: () =>
              import('../components/SideComponentStatisticsWithRulet.vue'),
          },
        },

        {
          path: '/announce/:id',
          name: 'announce-by-id',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacansiesJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/announce/jobs',
          name: 'announce-jobs',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacanciesOfJsc.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/announce/jobs/:id',
          name: 'announce-jobs-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacansiesJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/announce/meeting',
          name: 'announce-meeting',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/HoldingGms.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/announce/meeting/:id',
          name: 'announce-meeting-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacansiesJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/announce/corporal_management',
          name: 'announce-corporal_management',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/ComplyOrExplain.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/announce/corporal_management/:id',
          name: 'announce-corporal_management-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacansiesJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/announce/tender',
          name: 'announce-tender',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/Tenders.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/announce/tender/:id',
          name: 'announce-tender-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacansiesJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/announce/investments',
          name: 'announce-investments',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/Investments.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/announce/insvestments/:id',
          name: 'announce-investments-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/VacansiesJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/announce/other',
          name: 'announce-other',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/Other.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/announce/other/:id',
          name: 'announce-other-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/announcements/Investments.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/emission/jsc',
          name: 'emission-jsc',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import('../components/information disclosure/EmissionsJsc.vue'),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/emission/jsc/:id',
          name: 'emission-jsc-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/EmissionJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/emission/banks',
          name: 'emission-banks',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import('../components/information disclosure/EmissionsBanks.vue'),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/emission/banks/:id',
          name: 'emission-banks-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/EmissionBanksDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/emission/llc',
          name: 'emission-llc',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/LimitedLiabilityCompanies.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/emission/llc/:id',
          name: 'emission-llc-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/EmissionllcDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/emission/pc',
          name: 'emission-pc',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/privateCompanies.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/emission/pc/:id',
          name: 'emission-pc-detail',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/EmissionPcDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          path: '/reports/jsc/quarter',
          name: 'reports-quarter-jsc',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyReportJsc.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/jsc/quarter/:id',
          name: 'reports-quarter-detailJSC',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyReportJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/bank/quarter',
          name: 'reports-quarter-banks',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyReportBanks.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/bank/quarter/:id',
          name: 'reports-quarter-detailBanks',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyReportBanksDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/insurance/quarter',
          name: 'reports-insurance-banks',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyReportInsuranceCompanies.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/insurance/quarter/:id',
          name: 'reports-insurance-detailInsurance',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyReportInsuranceCompaniesDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/msfo/quarter',
          name: 'reports-msfo-quarter',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/QuarterReports/QuarterlyMsfo.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/jsc/annual',
          name: 'reports-annual-jsc',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/ReportJsc.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/jsc/annual/:id',
          name: 'reports-annual-detailJSC',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/ReportJscDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/bank/annual',
          name: 'reports-annual-banks',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/ReportBanks.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/bank/annual/:id',
          name: 'reports-annual-detailBanks',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/ReportBanksDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/insurance/annual',
          name: 'reports-annual-insurance',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/ReportInsuranceCompanies.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/insurance/annual/:id',
          name: 'reports-annual-detailInsurance',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/ReportInsuranceCompaniesDetail.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/msfo/annual',
          name: 'reports-msfo-annual',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/Msfo.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },
        {
          path: '/reports/audition/annual',
          name: 'reports-audition-annual',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this-- route
          // which is lazy-loaded when the route is visited.
          components: {
            default: () =>
              import(
                '../components/information disclosure/AnnualReports/Audition.vue'
              ),
            SideComponent: () =>
              import('../components/SideComponentStatistics.vue'),
          },
        },

        {
          name: 'PageNotFound',
          path: '/:pathMatch(.*)*',
          component: PageNotFound,
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (Object.keys(to.query).length !== 0) {
      return savedPosition
    }
    // if (to.path === from.path) {
    //   return savedPosition;
    // }
    return { top: 0 }
  },
})

export default router
