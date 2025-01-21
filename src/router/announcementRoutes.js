export const announcementRoutes = [
  {
    path: '/main-announce',
    name: 'main-announce',
    components: {
      default: () =>
        import('@/components/containers/AnnouncementContainer.vue'),
    },
  },

  {
    path: '/announce/:id',
    name: 'announce-by-id',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacansiesJscDetail.vue'
        ),
    },
  },

  {
    path: '/announce/jobs',
    name: 'announce-jobs',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacanciesOfJsc.vue'
        ),
    },
  },
  {
    path: '/announce/jobs/:id',
    name: 'announce-jobs-detail',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacansiesJscDetail.vue'
        ),
    },
  },

  {
    path: '/announce/meeting',
    name: 'announce-meeting',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/HoldingGms.vue'
        ),
    },
  },
  {
    path: '/announce/meeting/:id',
    name: 'announce-meeting-detail',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacansiesJscDetail.vue'
        ),
    },
  },

  {
    path: '/announce/corporal_management',
    name: 'announce-corporal_management',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/ComplyOrExplain.vue'
        ),
    },
  },
  {
    path: '/announce/corporal_management/:id',
    name: 'announce-corporal_management-detail',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacansiesJscDetail.vue'
        ),
    },
  },

  {
    path: '/announce/tender',
    name: 'announce-tender',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/Tenders.vue'
        ),
    },
  },
  {
    path: '/announce/tender/:id',
    name: 'announce-tender-detail',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacansiesJscDetail.vue'
        ),
    },
  },

  {
    path: '/announce/investments',
    name: 'announce-investments',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/Investments.vue'
        ),
    },
  },
  {
    path: '/announce/insvestments/:id',
    name: 'announce-investments-detail',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/VacansiesJscDetail.vue'
        ),
    },
  },

  {
    path: '/announce/other',
    name: 'announce-other',

    components: {
      default: () =>
        import('../components/information disclosure/announcements/Other.vue'),
    },
  },
  {
    path: '/announce/other/:id',
    name: 'announce-other-detail',

    components: {
      default: () =>
        import(
          '../components/information disclosure/announcements/Investments.vue'
        ),
    },
  },
]
