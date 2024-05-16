import { BusinessManagerType } from './bussinessManager';

export type BusinessType = {
  id: number;
  name: string;
  address: string;
  area: number;
  city: string;
  latitude: number;
  longitude: number;
  businessManager: Partial<BusinessManagerType>;
  merchant: number;
};
