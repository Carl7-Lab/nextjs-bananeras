import { BoxBrandType } from './box-brand/boxBrand';
import { BusinessType } from './business';
import { ClientType } from './client';
import { HarborType } from './harbor';
import { MerchantType } from './merchant';

export type ExportType = {
  id: number;
  boxQuantity: number;
  boxBrand: Partial<BoxBrandType>;
  merchant: Partial<MerchantType>;
  business: Partial<BusinessType>;
  harbor: Partial<HarborType>;
  client: Partial<ClientType>;
  shipSteam: string;
  shippingLineSeal: string;
  extraSeal: string;
  done: boolean;
};
