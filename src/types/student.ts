import { IInstitution } from "./institutions";

export interface IStudent {
  _id: string;
  studentId:  string;
  firstName:  string;
  middleName:  string;
  lastName:  string;
  email:  string;
  dob:  string;
  gender:  string;
  address:  string;
  phone:  string;
  publicKey:  string;
  privateKey:  string;
  institution: IInstitution
}