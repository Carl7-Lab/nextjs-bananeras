import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { CertificateType } from '@/types/box-brand/specifications/certificate';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getCertificate = ({
  certificateId,
}: {
  certificateId: string;
}) => {
  return axios.get(`/box-brand/certificate/${certificateId}`);
};

type QueryFnType = typeof getCertificate;

type UseCertificateOptions = {
  certificateId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useCertificate = ({
  certificateId,
}: UseCertificateOptions): UseQueryResult<CertificateType> => {
  const result = useQuery(
    ['certificate', certificateId],
    () => getCertificate({ certificateId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<CertificateType>;
};
