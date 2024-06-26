import { BusinessCodeType } from './businessCode';
import { CertificateType } from './certificate';
import { ContactType } from './contact';

export type BusinessType = {
  id: number | '';
  city: string;
  address: string;
  fruitType: string;
  name: string;
  area: number;
  latitude: number | '';
  longitude: number | '';
  codeMAGAP: string;
  certificates: Partial<CertificateType>[];
  businessCodes: Partial<BusinessCodeType>[];
  contacts: Partial<ContactType>[];
  merchant: number | '';
};
