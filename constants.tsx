
import { Plan } from './types';

export const DISCORD_LINK = "https://discord.gg/KVNvsU2Zy9";

export const PROMO_CODES: Record<string, string> = {
  "OLYMPIC": "25% DISCOUNT",
  "FREEFALL": "4GB FREE SERVER", 
  "FRANCE": "30% DISCOUNT",
  "BANGLADESH": "40% DISCOUNT",
  "DASCORD": "35% DISCOUNT",
  "OMNI": "39% DISCOUNT",
  "LBOY": "39% DISCOUNT",
  "HASAN": "39% DISCOUNT"
};

// Map discount descriptions back to codes for the automated messaging system
export const DISCOUNT_TO_CODE: Record<string, string> = {
  "25% DISCOUNT": "OLYMPIC",
  "4GB FREE SERVER": "FREEFALL",
  "30% DISCOUNT": "FRANCE",
  "40% DISCOUNT": "BANGLADESH",
  "35% DISCOUNT": "DASCORD",
  "39% DISCOUNT (OMNI)": "OMNI",
  "39% DISCOUNT (LBOY)": "LBOY",
  "39% DISCOUNT (HASAN)": "HASAN"
};

export const VOUCHER_PRICES: { name: string, price: number, discount: string }[] = [
  { name: "Mystery Voucher #1", price: 5.00, discount: "25% DISCOUNT" },
  { name: "Mystery Voucher #2", price: 7.50, discount: "30% DISCOUNT" },
  { name: "Mystery Voucher #3", price: 9.00, discount: "35% DISCOUNT" },
  { name: "Mystery Voucher #4", price: 11.00, discount: "39% DISCOUNT (OMNI)" },
  { name: "Mystery Voucher #5", price: 11.00, discount: "39% DISCOUNT (LBOY)" },
  { name: "Mystery Voucher #6", price: 11.00, discount: "39% DISCOUNT (HASAN)" },
  { name: "Mystery Voucher #7", price: 12.00, discount: "40% DISCOUNT" },
  { name: "Special Addon Voucher", price: 15.00, discount: "4GB FREE SERVER" },
];

export const STANDARD_PLANS: Plan[] = [
  {
    id: 's1',
    name: 'Plan 1',
    ram: '2GB',
    cpu: '100%',
    disk: '20GB SSD',
    price: { tk: '100', inr: '80', usd: '1.5' }
  },
  {
    id: 's2',
    name: 'Plan 2',
    ram: '4GB',
    cpu: '250%',
    disk: '40GB SSD',
    price: { tk: '200', inr: '150', usd: '3' }
  },
  {
    id: 's3',
    name: 'Plan 3',
    ram: '8GB',
    cpu: '500%',
    disk: '80GB SSD',
    price: { tk: '400', inr: '350', usd: '5' }
  },
  {
    id: 's4',
    name: 'Plan 3.5',
    ram: '16GB',
    cpu: '1000%',
    disk: '120GB SSD',
    price: { tk: '600', inr: '500', usd: '7' }
  },
  {
    id: 's5',
    name: 'Plan 4',
    ram: '64GB',
    cpu: 'Unlimited',
    disk: '320GB SSD',
    price: { tk: '800', inr: '600', usd: '10' }
  },
  {
    id: 's6',
    name: 'Plan 5 (Custom)',
    ram: 'Your Wish',
    cpu: 'Your Wish',
    disk: 'Your Wish',
    price: { tk: 'Custom', inr: 'Custom', usd: 'Custom' }
  }
];

export const SPECIAL_PLANS: Plan[] = [
  {
    id: 'sp1',
    name: 'Special Plan 1',
    ram: '2GB',
    cpu: 'Ryzen Core',
    disk: '20GB SSD',
    price: { usd: '0.41', inr: '37.02', tk: '50', pkr: '114.67' },
    special: true
  },
  {
    id: 'sp2',
    name: 'Special Plan 2',
    ram: '4GB',
    cpu: 'Ryzen Core',
    disk: '40GB SSD',
    price: { usd: '0.82', inr: '74.04', tk: '100', pkr: '229.34' },
    special: true
  },
  {
    id: 'sp3',
    name: 'Special Plan 3',
    ram: '6GB',
    cpu: 'Ryzen Core',
    disk: '60GB SSD',
    price: { usd: '1.15', inr: '103.66', tk: '140', pkr: '321.07' },
    special: true
  },
  {
    id: 'sp4',
    name: 'Special Plan 4',
    ram: '8GB',
    cpu: 'Ryzen Core',
    disk: '80GB SSD',
    price: { usd: '1.47', inr: '133.26', tk: '180', pkr: '412.80' },
    special: true
  }
];
