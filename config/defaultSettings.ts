import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  locale?: boolean;
} = {
  locale: false as any,
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design Pro',
  pwa: true,
  logo: 'https://mi-test.s3.cn-east-2.jdcloud-oss.com/static/wayzone-sc/2023/4/_assets_rc-upload-1680574241758-3abstract.png',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
