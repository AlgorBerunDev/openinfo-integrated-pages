export const emissionRoutes = [
  {
    path: '/emission/jsc',
    name: 'emission-jsc',

    components: {
      default: () =>
        import('../components/information disclosure/EmissionsJsc.vue'),
    },
  },
  {
    path: '/emission/jsc/:id',
    name: 'emission-jsc-detail',

    components: {
      default: () =>
        import('../components/information disclosure/EmissionJscDetail.vue'),
    },
  },

  {
    path: '/emission/banks',
    name: 'emission-banks',

    components: {
      default: () =>
        import('../components/information disclosure/EmissionsBanks.vue'),
    },
  },
  {
    path: '/emission/banks/:id',
    name: 'emission-banks-detail',

    components: {
      default: () =>
        import('../components/information disclosure/EmissionBanksDetail.vue'),
    },
  },

  {
    path: '/emission/llc',
    name: 'emission-llc',

    components: {
      default: () =>
        import(
          '../components/information disclosure/LimitedLiabilityCompanies.vue'
        ),
    },
  },

  {
    path: '/emission/llc/:id',
    name: 'emission-llc-detail',

    components: {
      default: () =>
        import('../components/information disclosure/EmissionllcDetail.vue'),
    },
  },

  {
    path: '/emission/pc',
    name: 'emission-pc',

    components: {
      default: () =>
        import('../components/information disclosure/privateCompanies.vue'),
    },
  },

  {
    path: '/emission/pc/:id',
    name: 'emission-pc-detail',

    components: {
      default: () =>
        import('../components/information disclosure/EmissionPcDetail.vue'),
    },
  },
]
