
const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'templates', component: () => import('pages/Templates.vue') },
      { path: 'tags', component: () => import('pages/Tags.vue') },
      {
        path: 'list/:id',
        component: () => import('pages/ListDetail.vue'),
        props: route => ({
          id: route.params.id,
          enableEdit: Boolean(route.query.enableEdit),
        }),
      },
      {
        path: 'templates/:id',
        component: () => import('pages/TemplateDetail.vue'),
        props: route => ({
          id: route.params.id,
          enableEdit: Boolean(route.query.enableEdit),
        }),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
