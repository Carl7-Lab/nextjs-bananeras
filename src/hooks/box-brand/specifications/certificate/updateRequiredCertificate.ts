import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { RequiredCertificateType } from '@/types/box-brand/specifications/requiredCertificate';

type updateRequiredCertificateDTO = {
  data: Partial<RequiredCertificateType>;
  certificateId: string;
};

const updateRequiredCertificate = ({
  data,
  certificateId,
}: updateRequiredCertificateDTO) => {
  return axios.post(`/box-brand/certificate/${certificateId}`, data);
};

type UseUpdateRequiredCertificateOptions = {
  config?: MutationConfig<typeof updateRequiredCertificate>;
};

export const useUpdateRequiredCertificate = ({
  config,
}: UseUpdateRequiredCertificateOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateRequiredCertificate,
  });

  return { ...mutation, updateRequiredCertificate: mutation.mutateAsync };
};
