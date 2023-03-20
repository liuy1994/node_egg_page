import { request } from '@umijs/max';

export const getListApi = (params: any) => {
  return request('/api/content', {
    params,
  });
};
