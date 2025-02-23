/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { MerchantType } from '@/types/merchant/merchant';

interface CreateOnboardingResponse {
  merchantId: string;
}

export const createOnboarding = (
  data: Partial<MerchantType>
): Promise<CreateOnboardingResponse> => {
  return axios.post('/auth/exporter/onboarding', data);
};

type UseCreateOnboardingOptions = {
  config?: MutationConfig<typeof createOnboarding>;
};

export const useCreateOnboarding = ({
  config,
}: UseCreateOnboardingOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createOnboarding,
  });

  return { ...mutation, createOnboarding: mutation.mutate };
};
