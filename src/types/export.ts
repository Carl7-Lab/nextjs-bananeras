import { BoxBrandType } from './box-brand/boxBrand';
import { ClientType } from './client';
import { CuttingType } from './cuttingType';
import { ExportSentType } from './exportSent';
import { HarborType } from './harbor';
import { BusinessType } from './merchant/business';
import { MerchantType } from './merchant/merchant';

export type ExportType = {
  id: number | '';
  cuttingDate: Date | '';
  weekDescription: string;
  weekDaysOfWeek: string[] | null;
  weekBoxesOfDay: number[];
  weekTotal: number;
  boxQuantity: number | '';
  boxBrand: Partial<BoxBrandType>;
  boxBrandId: number | '';
  cuttingType: Partial<CuttingType>;
  cuttingTypeId: number | '';
  merchant: Partial<MerchantType>;
  merchantId: number | '';
  business: Partial<BusinessType>;
  businessId: number | '';
  harborDeparture: Partial<HarborType>;
  departureHarborId: number | '';
  harborDestination: Partial<HarborType>;
  destinationHarborId: number | '';
  client: Partial<ClientType>;
  clientId: number | '';
  shipSteam: string;
  shippingLineSeal: string;
  extraSeal: string;
  pendingExportSent: boolean;
  pendingCuttingSheet: boolean;
  exportSent: Partial<ExportSentType>;
};
