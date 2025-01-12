export interface IInstitution {
  _id: string;
  institutionId: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact: string;
  website: string;
  password: string;
  publicKey: string;
  privateKey: string;
  isVerified: boolean;
  type: 'university' | 'college' | 'technical';
}