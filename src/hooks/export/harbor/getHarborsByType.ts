import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

interface listHarborsProps {
  params: Params;
  type: 'Nacional' | 'Internacional';
}

function listHarborsByType({ params, type }: listHarborsProps) {
  return axios.get(`/harbor/type/${type}`, { params });
}

interface useHarborsProps extends Params {
  type: 'Nacional' | 'Internacional';
}

export function useHarborsByType({
  search = '',
  page = 1,
  limit = 10,
  type,
}: useHarborsProps) {
  const result = useQuery(
    ['harborsByType', search, page, limit, type],
    () => listHarborsByType({ params: { search, page, limit }, type }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
