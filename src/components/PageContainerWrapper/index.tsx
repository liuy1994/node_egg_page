import { PageContainer } from '@ant-design/pro-components';
import { PageContainerProps } from '@ant-design/pro-layout/es/components/PageContainer';
import { Link } from '@umijs/max';
import { merge } from 'lodash';
type Props = PageContainerProps

const PageContainerWrapper = (props: Props) => {
  const breadcrumbItemRender = (route: any) => {
    return route.path ? <Link to={route.path}>{route.title}</Link> : <span>{route.title}11</span>;
  };

  const { children, ...restProps } = props;
  return (
    <PageContainer
      {...merge(restProps, {
        breadcrumb: {
          itemRender: breadcrumbItemRender,
        },
      })}
    >
      {children}
    </PageContainer>
  );
};
export default PageContainerWrapper;
