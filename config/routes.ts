export default [
  { name: '登录', path: '/login', component: './Login', layout: false },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
