/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

type uploadMerchantLogoDTO = {
  logoImg: File;
  merchantId: string;
};

const uploadMerchantLogo = async ({
  logoImg,
  merchantId,
}: uploadMerchantLogoDTO): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('file', logoImg);

  try {
    return await axios.post(`/merchant/${merchantId}/logo`, formData, {
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

type UseUploadMerchantLogoOptions = {
  config?: MutationConfig<typeof uploadMerchantLogo>;
};

export const useUploadMerchantLogo = ({
  config,
}: UseUploadMerchantLogoOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: uploadMerchantLogo,
  });

  return { ...mutation, uploadMerchantLogo: mutation.mutateAsync };
};
