import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

type uploadExporterLogoDTO = {
  logoImg: File;
  exporterId: string;
};

const uploadExporterLogo = async ({
  logoImg,
  exporterId,
}: uploadExporterLogoDTO) => {
  const formData = new FormData();
  formData.append('file', logoImg);

  try {
    return await axios.post(`/exporter/${exporterId}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error: any) {
    console.error(`Error: :'c =>`, error);
    if (!!error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

type UseUploadExporterLogoOptions = {
  config?: MutationConfig<typeof uploadExporterLogo>;
};

export const useUploadExporterLogo = ({
  config,
}: UseUploadExporterLogoOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: uploadExporterLogo,
  });

  return { ...mutation, uploadExporterLogo: mutation.mutateAsync };
};
