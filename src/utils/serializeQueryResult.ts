import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';

export function serializeQueryResult(
  result: UseQueryResult<AxiosResponse<any, any>, unknown>
) {
  return { ...result, data: result.data?.data };
}
