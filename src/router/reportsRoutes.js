export const reportsRoutes = [
  {
    path: '/main-reports/',
    name: 'main-reports',

    components: {
      default: () =>
        import(
          '../components/information disclosure/reports-all/Main-reports.vue'
        ),
    },
  },
  {
    path: '/reports/jsc/quarter',
    name: 'reports-quarter-jsc',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyReportJsc.vue'
        ),
    },
  },
  {
    path: '/reports/jsc/quarter/:id',
    name: 'reports-quarter-detailJSC',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyReportJscDetail.vue'
        ),
    },
  },
  {
    path: '/reports/bank/quarter',
    name: 'reports-quarter-banks',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyReportBanks.vue'
        ),
    },
  },
  {
    path: '/reports/bank/quarter/:id',
    name: 'reports-quarter-detailBanks',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyReportBanksDetail.vue'
        ),
    },
  },
  {
    path: '/reports/insurance/quarter',
    name: 'reports-insurance-banks',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyReportInsuranceCompanies.vue'
        ),
    },
  },
  {
    path: '/reports/insurance/quarter/:id',
    name: 'reports-insurance-detailInsurance',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyReportInsuranceCompaniesDetail.vue'
        ),
    },
  },
  {
    path: '/reports/msfo/quarter',
    name: 'reports-msfo-quarter',

    components: {
      default: () =>
        import(
          '../components/information disclosure/QuarterReports/QuarterlyMsfo.vue'
        ),
    },
  },
  {
    path: '/reports/jsc/annual',
    name: 'reports-annual-jsc',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/ReportJsc.vue'
        ),
    },
  },
  {
    path: '/reports/jsc/annual/:id',
    name: 'reports-annual-detailJSC',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/ReportJscDetail.vue'
        ),
    },
  },
  {
    path: '/reports/bank/annual',
    name: 'reports-annual-banks',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/ReportBanks.vue'
        ),
    },
  },
  {
    path: '/reports/bank/annual/:id',
    name: 'reports-annual-detailBanks',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/ReportBanksDetail.vue'
        ),
    },
  },
  {
    path: '/reports/insurance/annual',
    name: 'reports-annual-insurance',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/ReportInsuranceCompanies.vue'
        ),
    },
  },
  {
    path: '/reports/insurance/annual/:id',
    name: 'reports-annual-detailInsurance',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/ReportInsuranceCompaniesDetail.vue'
        ),
    },
  },
  {
    path: '/reports/msfo/annual',
    name: 'reports-msfo-annual',

    components: {
      default: () =>
        import('../components/information disclosure/AnnualReports/Msfo.vue'),
    },
  },
  {
    path: '/reports/audition/annual',
    name: 'reports-audition-annual',

    components: {
      default: () =>
        import(
          '../components/information disclosure/AnnualReports/Audition.vue'
        ),
    },
  },
]
