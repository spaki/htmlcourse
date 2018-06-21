import { BagItem } from '../models/BagItem';

export interface Bag {
  id: string;
  userMail: string;
  items: BagItem[];
  isActive: boolean;
}
  