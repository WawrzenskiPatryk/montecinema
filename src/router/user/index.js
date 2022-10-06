export default [
  {
    path: '/my-account',
    redirect: '/my-account/personal-details',
  },
  {
    path: '/my-account',
    name: 'UserAccountPage',
    component: () => import('@/pages/user/UserAccountPage.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'personal-details',
        name: 'UserPersonalDetailsPage',
        component: () => import('@/components/user/UserDetailsForm.vue'),
      },
      {
        path: 'reservations',
        name: 'UserReservationsPage',
        component: () => import('@/components/user/UserReservationsList.vue'),
      },
    ],
  },
];
