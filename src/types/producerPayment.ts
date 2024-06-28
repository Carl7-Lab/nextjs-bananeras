import { BankAccountType } from './bankAccount';
import { HarborType } from './harbor';
import { MerchantType } from './merchant/merchant';

export type ProducerPaymentType = {
  id: number | '';
  exportSentId: number | '';
  // selling
  merchantId: number | '' | Partial<MerchantType>;
  departureHarborId: number | '' | Partial<HarborType>;
  destinationHarborId: number | '' | Partial<HarborType>;
  boxQuantity: number | '';
  boxBrandId: number | '';
  subtotal1: number | '';
  price: number | '';
  // expenses
  transport: number | '';
  materials: number | '';
  others: number | '';
  description: string;
  subtotal2: number | '';
  total: number | '';

  sourceBankAccountId: number | '' | Partial<BankAccountType>;
  destinationBankAccountId: number | '' | Partial<BankAccountType>;
  amount: number | '';
};
