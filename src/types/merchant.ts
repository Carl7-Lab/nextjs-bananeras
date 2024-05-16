import { BusinessType } from './business';

export type MerchantType = {
  id: number | '';
  businessName: string;
  businessId: string;
  address: string;
  city: string;
  business: Partial<BusinessType>;
};
