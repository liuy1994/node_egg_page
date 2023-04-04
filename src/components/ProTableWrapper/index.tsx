import { ProTable, RequestData } from '@ant-design/pro-components';
import { ProTableProps } from '@ant-design/pro-table/es/typing';

type Props = ProTableProps<any, any>

const ProTableWrapper = (props: Props) => {
  const { request, ...restProps } = props;
  return (
    <ProTable
      request={async (params, sort, filter): Promise<RequestData<any>> => {
        return request?.(params, sort, filter) as Promise<RequestData<any>>;
      }}
      {...restProps}
    />
  );
};

export default ProTableWrapper;
