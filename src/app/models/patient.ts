import { Address } from './address';
import { Name } from './name';

export interface Patient {
  name: Name;
  dob: Date;
  email?: string;
  phone: string;
  address: Address[];
  gender: boolean;
  insurance?: string;
  last_exam: Date;
  notes?: string;
}
