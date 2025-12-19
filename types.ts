
export interface Plan {
  id: string;
  name: string;
  ram: string;
  cpu: string;
  disk: string;
  price: {
    tk: string;
    inr: string;
    usd: string;
    pkr?: string;
  };
  special?: boolean;
}

export interface UserMessage {
  id: string;
  from: string;
  content: string;
  timestamp: number;
}

export interface User {
  username: string;
  displayName: string;
  email: string;
  profilePic?: string;
  balance: number;
  isAdmin?: boolean;
  vouchers?: string[]; // List of purchased discounts
  messages?: UserMessage[]; // Messages sent by Spark
}

export enum View {
  HOME = 'HOME',
  PLANS = 'PLANS',
  SPECIALS = 'SPECIALS',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  ADMIN = 'ADMIN',
  VOUCHER_SHOP = 'VOUCHER_SHOP',
  MESSAGES = 'MESSAGES'
}
