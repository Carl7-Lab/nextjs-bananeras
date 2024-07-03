import { InsecticideType } from './insecticide';

export type InsecticideCocktailPart = {
  id: number | '';
  quantity: number | '';
  insecticide: Partial<InsecticideType>;
};
