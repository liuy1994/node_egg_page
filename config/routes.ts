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
    path: "/large_upload",
    name: "切片上传",
    icon: "smile",
    component: "./LargeUpload",
  },
  {
    path: "/upload",
    name: "Upload(Vue 子应用)",
    icon: "smile",
    component: "./Upload",
  },
  {
    path: "/markdown",
    name: "Markdown(React 子应用)",
    icon: "smile",
    component: "./Markdown",
  },
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
