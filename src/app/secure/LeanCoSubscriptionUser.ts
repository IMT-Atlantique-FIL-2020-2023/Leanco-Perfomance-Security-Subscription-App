export interface LeanCoSubscriptionUser {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  company: Company;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  subscription_startdate: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  subscription_enddate: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  subscription_type: SubscriptionType;
}

export interface Company {
  id: number;
  name: string;
}

export interface SubscriptionType {
  id: number;
  type: string;
}
