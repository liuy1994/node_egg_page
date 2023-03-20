import { getListApi } from '@/services/content';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import React from 'react';

const Welcome: React.FC = () => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
  ];

  return (
    <PageContainer>
      <ProTable
        toolbar={{
          title: '列表标题',
          subTitle: '列表副标题',
        }}
        request={getListApi}
        columns={columns}
        rowKey={'id'}
      />
      <ProCard title={123}>123</ProCard>
    </PageContainer>
  );
};

export default Welcome;
