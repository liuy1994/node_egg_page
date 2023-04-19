const getEnv = () => {
  const hostname = location.hostname
  switch (hostname) {
    case "demo.0218.life":
      return "prod"
    default:
      return "development"
  }
}

const appConfig = {
  development: {
    react: "//localhost:8001",
  },
  prod: {
    react: "//react.0218.life",
  },
}

export const qiankun = {
  apps: [
    {
      name: "react",
      entry: appConfig[getEnv()].react,
    },
  ],
  lifeCycles: {
    // 所有子应用在挂载完成时，打印 props 信息
    async afterMount(props: any) {
      console.log(props)
    },
  },
}
