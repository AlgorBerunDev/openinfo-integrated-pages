export const factsRoutes = [
  {
    path: '/facts',
    name: 'facts',
    components: {
      default: () => import('../views/factsView/Facts.vue'),
    },
  },
  {
    path: '/facts/:id/:factId',
    name: 'facts-detailed',
    components: {
      default: () => import('../views/FactsMore.vue'),
    },
  },
]
