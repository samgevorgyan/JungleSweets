export interface User {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  emailVerified: boolean;
  isPurchased: boolean;
}
