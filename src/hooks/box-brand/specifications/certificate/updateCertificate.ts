import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { CertificateType } from '@/types/box-brand/specifications/certificate';

type updateCertificateDTO = {
  data: Partial<CertificateType>;
  certificateId: string;
};

const updateCertificate = ({ data, certificateId }: updateCertificateDTO) => {
  return axios.post(`/box-brand/certificate/${certificateId}`, data);
};

type UseUpdateCertificateOptions = {
  config?: MutationConfig<typeof updateCertificate>;
};

export const useUpdateCertificate = ({
  config,
}: UseUpdateCertificateOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateCertificate,
  });

  return { ...mutation, updateCertificate: mutation.mutateAsync };
};
