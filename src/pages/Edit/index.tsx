import PageContainerWrapper from '@/components/PageContainerWrapper';
import { useParams } from '@@/exports';
import { useMemo } from 'react';

const Edit = () => {
  const { id } = useParams<any>();
  const breadcrumbItems = useMemo(() => {
    return id
      ? [
          {
            title: '列表',
            path: '/list',
          },
          {
            title: '编辑',
          },
        ]
      : [
          {
            title: '新增',
          },
        ];
  }, [id]);

  return (
    <PageContainerWrapper
      breadcrumb={{
        items: breadcrumbItems,
      }}
    >
      Edit
    </PageContainerWrapper>
  );
};

export default Edit;
