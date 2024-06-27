import { RequirementSCType } from './requirementSC';

export type HarborType = {
  id: number | '';
  type: string;
  country: string;
  city: string;
  location: string;
  name: string;
  latitude: number | '';
  longitude: number | '';
  openTime: string;
  closeTime: string;
  shippingCompanies: number[] | null;
  requirementsSC: Partial<RequirementSCType>[];
};
