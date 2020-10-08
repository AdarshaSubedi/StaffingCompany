export interface MvCustomerDetail {
  customerId: number;
  organizationId: number;
  organizationName: string;
  organizationCategory: string;
  organizationDescription: string;
  fullAddress: string;
  email: string;
  phone: string;
  insertPersonId: number;
}
export interface MvNewCustomer{
  organizationName: string;
  organizationCategory: string;
  organizationDescription: string;
  fullAddress: string;
  email: string;
  phone: string;
  insertPersonId: number;
}
