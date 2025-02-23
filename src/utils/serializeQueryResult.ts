/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';

export function serializeQueryResult(
  result: UseQueryResult<AxiosResponse<any, any>, unknown>
) {
  return { ...result, data: result.data?.data };
}
