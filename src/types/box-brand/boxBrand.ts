import { BlockingSheetType } from './additions/blockingSheet';
import { InsecticideCocktailPart } from './additions/insecticideCocktailPart';
import { LatexRemoverType } from './additions/latexRemover';
import { MettoLabelType } from './container/mettoLabel';
import { SealType } from './container/seal';
import { StapleType } from './container/staple';
import { StrippingType } from './container/stripping';
import { ThermographType } from './container/thermograph';
import { BandType } from './materials/band';
import { ClusterBagType } from './materials/clusterBag';
import { LabelType } from './materials/label';
import { ProtectorType } from './materials/protector';
import { RubberType } from './materials/rubber';
import { SachetType } from './materials/sachet';
import { PesticideCocktailPart } from './post-harvest/pesticideCocktailPart';
import { BrandType } from './specifications/brand';

export type BoxBrandType = {
  id: number | '';
  // specifications
  brand: Partial<BrandType>;
  brandId: number | '';
  name: string;
  brandCode: string;
  boxQuantity: number | '';
  netWeightBox: number | '';
  grossWeightBox: number | '';
  requiredCertificates: number[] | null;
  // materials
  bottomType: string;
  bottomTypeQuantity: number | '';
  lidType: string;
  lidTypeQuantity: number | '';
  coverType: string;
  coverTypeQuantity: number | '';
  cardboardType: string;
  cardboardTypeQuantity: number | '';
  padType: string;
  padTypeQuantity: number | '';
  spongeType: string;
  spongeTypeQuantity: number | '';

  label: Partial<LabelType>;
  labelId: number | '';
  labelQuantity: number | '';
  band: Partial<BandType>;
  bandId: number | '';
  bandQuantity: number | '';
  sachet: Partial<SachetType>;
  sachetId: number | '';
  sachetQuantity: number | '';
  rubber: Partial<RubberType>;
  rubberId: number | '';
  rubberQuantity: number | '';
  protector: Partial<ProtectorType>;
  protectorId: number | '';
  protectorQuantity: number | '';
  clusterBag: Partial<ClusterBagType>;
  clusterBagId: number | '';
  clusterBagQuantity: number | '';
  // post harvest
  pesticideCocktail: Partial<PesticideCocktailPart>[];
  // pesticidesQuantity: number | '';
  // pesticideList: Partial<PesticideType>[];
  // container
  palletsType: string;
  palletsTypeQuantity: number | '';
  miniPalletsType: string;
  miniPalletsTypeQuantity: number | '';
  cornerType: string;
  cornerTypeQuantity: number | '';
  reinforcementType: string;
  reinforcementTypeQuantity: number | '';

  staple: Partial<StapleType>;
  stapleId: number | '';
  stapleQuantity: number | '';
  stripping: Partial<StrippingType>;
  strippingId: number | '';
  strippingQuantity: number | '';
  thermograph: Partial<ThermographType>;
  thermographId: number | '';
  thermographQuantity: number | '';
  seal: Partial<SealType>;
  sealId: number | '';
  sealQuantity: number | '';
  mettoLabel: Partial<MettoLabelType>;
  mettoLabelId: number | '';
  mettoLabelQuantity: number | '';
  // additions
  packingTapeType: string;
  packingTapeTypeQuantity: number | '';

  latexRemover: Partial<LatexRemoverType>;
  latexRemoverId: number | '';
  latexRemoverQuantity: number | '';
  blockingSheet: Partial<BlockingSheetType>;
  blockingSheetId: number | '';
  blockingSheetQuantity: number | '';
  insecticideCocktail: Partial<InsecticideCocktailPart>[];
  // insecticides: number[] | null | Partial<InsecticideType>[];
  // insecticidesQuantity: number | '';
  // insecticideList: Partial<InsecticideType>[];
};
