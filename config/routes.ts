export default [
  {
    name: "登录",
    path: "/login",
    component: "./Login",
    layout: false,
  },
  {
    path: "/list",
    name: "列表",
    icon: "smile",
    component: "./List",
  },
  {
    path: "/detail/:id",
    name: "详情",
    icon: "smile",
    component: "./Detail",
    parentKeys: ["/list"],
    hideInMenu: true,
  },
  {
    path: "/create",
    name: "新增",
    icon: "smile",
    component: "./Edit",
  },
  {
    path: "/edit/:id",
    name: "编辑",
    icon: "smile",
    parentKeys: ["/list"],
    component: "./Edit",
    hideInMenu: true,
  },
  {
    path: "/upload",
    name: "上传",
    icon: "smile",
    component: "./Upload",
  },
  // {
  //   path: "/markdown",
  //   name: "Markdown",
  //   icon: "smile",
  //   component: "./Markdown"
  // },
  {
    path: "/",
    redirect: "/list",
  },
  {
    path: "*",
    layout: false,
    component: "./404",
  },
]
