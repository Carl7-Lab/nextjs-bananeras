import { ExportType } from './export';

export type ExportSentType = {
  id: number | '';
  export: Partial<ExportType>;
  // materials
  bottomTypeQuantity: number | '';
  lidTypeQuantity: number | '';
  coverTypeQuantity: number | '';
  cardboardTypeQuantity: number | '';
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
  pesticideQuantity: number | '';
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
  cochibiolQuantity: number | '';
  blockingSheetQuantity: number | '';

  done: boolean;
};
