import { HarborType } from './harbor';

export type ClientType = {
  id: number | '';
  businessName: string;
  businessId: string;
  type: string;
  email: string;
  phone: string;
  harborId: number[] | null;
  harbors: Partial<HarborType>[];
};
