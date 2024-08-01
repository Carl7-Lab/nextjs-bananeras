import { InsecticideType } from './box-brand/additions/insecticide';
import { PesticideType } from './box-brand/post-harvest/pesticide';
import { ExportType } from './export';
import { ProducerPaymentType } from './producerPayment';

export type PesticideSentPartType = {
  id: number | '';
  quantity: number | '';
  pesticide: Partial<PesticideType>;
};

export type InsecticideSentPartType = {
  id: number | '';
  quantity: number | '';
  insecticide: Partial<InsecticideType>;
};

export type ExportSentType = {
  id: number | '';
  export: Partial<ExportType>;
  exportId: number | '';
  // materials
  bottomTypeQuantity: number | '';
  lidTypeQuantity: number | '';
  coverTypeQuantity: number | '';
  cardboardTypeQuantity: number | '';
  parasealTypeQuantity: number | '';
  padTypeQuantity: number | '';
  spongeTypeQuantity: number | '';
  // select
  labelQuantity: number | '';
  bandQuantity: number | '';
  sachetQuantity: number | '';
  rubberQuantity: number | '';
  protectorQuantity: number | '';
  clusterBagQuantity: number | '';
  // post harvest
  pesticideSent: PesticideSentPartType[];
  // container
  palletsTypeQuantity: number | '';
  miniPalletsTypeQuantity: number | '';
  cornerTypeQuantity: number | '';
  reinforcementTypeQuantity: number | '';
  // select
  stapleQuantity: number | '';
  strippingQuantity: number | '';
  thermographQuantity: number | '';
  sealQuantity: number | '';
  mettoLabelQuantity: number | '';
  // additions
  packingTapeTypeQuantity: number | '';
  // select
  latexRemoverQuantity: number | '';
  blockingSheetQuantity: number | '';
  insecticideSent: InsecticideSentPartType[];

  pendingProducerPayment: boolean;
  producerPayment: ProducerPaymentType;
};
