import { BagItem } from '../models/BagItem';

export interface Bag {
  Id: string;
  UserMail: string;
  Items: BagItem[];
  IsActive: boolean;
}
  