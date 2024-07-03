import { PesticideType } from './pesticide';

export type PesticideCocktailPart = {
  id: number | '';
  quantity: number | '';
  pesticide: Partial<PesticideType>;
};
