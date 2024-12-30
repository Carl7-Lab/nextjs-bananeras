export interface CuttingSheetType {
  cuttingDate: Date | '';

  weekDescription: string;
  weekDaysOfWeek: string[] | null;
  weekBoxesOfDay: number[];
  weekTotal: number;

  producerBusinessName: string;
  producerBusiness: string;
  producerQuality?: string;
  producerCity: string;
  producerCodeMAGAP: string;

  containerBoxBrand: string;
  containerShipmentType: string;
  containerBoxType: string;
  containerSteam: string;
  containerHarborDeparture: string;
  containerBoxQuantity: number;
  containerPositioning: string;
  containerBelowDeck: string;
  containerHighPallets: string;
  containerCluster: string;
  containerFileCode: string;

  cutLeaves?: number;
  cutAgeCutting?: number;
  cutNetWeight: number;
  cutGrossWeight: number;
  cutCaliberMin?: number;
  cutCaliberMax?: number;
  cutFingerLength?: number;
  cutSaneos?: number;
  cutCunas?: string;
  cutLabels: string;

  packagingBag?: string;
  packagingSachet: string;
  packagingPad: string;
  packagingFirstLine?: string;
  packagingSecondLine?: string;
  packagingThirdLine?: string;
  packagingFourthLine?: string;

  materialsPackagingPattern?: string;
  materialsPallets: string;
  materialsPlasticCorners: string;
  materialsReinforcements: string;
  materialsPlasticStraps: string;
  materialsStaples: string;
  materialsCardboardSheets: string;
  materialsAuthorizedTransport?: string;
  materialsThermometer: string;
  materialsGeneralObservations?: string;

  fumigationCosmoAgua?: string;
  fumigationSb100?: string;
  fumigationSatisfar?: string;
  fumigationMertec?: string;
  fumigationEclipse?: string;
  fumigationSelect101?: string;
  fumigationCitricAcid?: string;

  exporterId: number;
  exportId: number;
}
