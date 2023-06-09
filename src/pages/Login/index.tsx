import logo from "@/assets/icons/logo.svg"
import Footer from "@/components/Footer"
import { login, registerApi } from "@/services/auth"
import { setItem } from "@/utils"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { LoginForm, ProFormText } from "@ant-design/pro-components"
import { useEmotionCss } from "@ant-design/use-emotion-css"
import { Helmet, history, useModel } from "@umijs/max"
import { Alert, message, Tabs } from "antd"
import React, { useState } from "react"
import { flushSync } from "react-dom"
import Settings from "../../../config/defaultSettings"

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  )
}

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<any>({})
  const { initialState, setInitialState } = useModel("@@initialState")
  const [type, setType] = useState<string>("login")

  const containerClassName = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    }
  })

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }))
      })
    }
  }

  const loginFn = async (values: any) => {
    try {
      // 登录
      const res = await login(values)
      message.success("登录成功！")
      setItem("token", res?.token)
      await fetchUserInfo()
      history.push("/")
    } catch (error: any) {
      const msg = error?.response?.data?.error || "请求出错，请稍后重试"
      setUserLoginState({ status: msg })
    }
  }

  const registerFn = async (values: any) => {
    try {
      // 登录
      const msg = await registerApi(values)
      setUserLoginState(msg)
      message.success("注册成功！")
      setType("login")
      setUserLoginState({})
    } catch (error: any) {
      const msg = error?.response?.data?.error || "请求出错，请稍后重试"
      setUserLoginState({ status: msg })
    }
  }

  const handleSubmit = async (values: any) => {
    setUserLoginState({})
    if (type === "login") {
      loginFn(values)
    }
    if (type === "register") {
      registerFn(values)
    }
  }
  const { status } = userLoginState

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>登录页 - {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: "1",
          padding: "32px 0",
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          logo={<img alt="logo" src={logo} />}
          title="Ant Design"
          subTitle={"Ant Design 登录页面"}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as any)
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: "login",
                label: "登录",
              },
              {
                key: "register",
                label: "注册",
              },
            ]}
          />
          {status && <LoginMessage content={status} />}
          {type === "login" ? (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"用户名：test01"}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                placeholder={"密码：123456"}
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>
          ) : (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"用户名"}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"昵称"}
                rules={[
                  {
                    required: true,
                    message: "请输入昵称!",
                  },
                ]}
              />
              <ProFormText
                name="mobile"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"手机号"}
                rules={[
                  {
                    required: true,
                    message: "请输入手机号!",
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined />,
                }}
                placeholder={"邮箱"}
                rules={[
                  {
                    required: true,
                    message: "请输入邮箱!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                placeholder={"密码"}
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
              <ProFormText.Password
                name="rePassword"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined />,
                }}
                placeholder={"确认密码"}
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
