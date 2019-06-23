export interface NewCustomer{
  id: string;
  firstName: string;
  lastName: string;
  userAddress: string;
  userEmail: string;
  userPhone?: string[];
  userBirthday: string;
  userNotes: string;
}
