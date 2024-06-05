import { ClientType } from './client';
import { MerchantType } from './merchant';

export type BankAccountType = {
  id: number | '';
  client: Partial<ClientType>;
  merchant: Partial<MerchantType>;
  bank: string;
  owner: string;
  ownerID: string;
  accountNumber: string;
  type: string;
  email: string;
};
