import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { CertificateType } from '@/types/box-brand/specifications/certificate';

interface CreateCertificateResponse {
  certificateId: string;
}

export const createCertificate = (
  data: Partial<CertificateType>
): Promise<CreateCertificateResponse> => {
  return axios.post('/box-brand/certificate', data);
};

type UseCreateCertificateOptions = {
  config?: MutationConfig<typeof createCertificate>;
};

export const useCreateCertificate = ({
  config,
}: UseCreateCertificateOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createCertificate,
  });

  return { ...mutation, createCertificate: mutation.mutate };
};
