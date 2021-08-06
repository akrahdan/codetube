export type PaymentPlans = Record<string, PaymentPlan>;

export type PaymentPlan = {
  currency: Currency;
  formatted_monthly_price: string;
  formatted_price: string;
  formatted_savings_six_months?: string;
  monthly_price_without_savings?: string;
  formatted_savings?: string;
  period_number: number;
  period: 'month' | 'six_months' | 'year';
  plan_id: string;
  price_without_savings: string;
  price: number;
  title: string;
  is_trial_plan?: boolean;
  student_plan?: boolean;
};

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CAD = 'CAD',
  GBP = 'GBP',
  AUD = 'AUD',
  INR = 'INR',
  SEK = 'SEK',
  NOK = 'NOK',
}

export enum CurrencySymbol {
  DOLLAR = '$',
  POUND = '£',
  EURO = '€',
  RUPEE = '₹',
  KRONA = 'kr',
  KRONE = 'kr',
}

export type BusinessPaymentPlan = {
  currency: Currency;
  discount_percent?: number;
  formatted_monthly_price: string;
  formatted_price: string;
  formatted_savings_six_months?: string;
  monthly_price_without_savings?: string;
  formatted_savings?: string;
  period_number: number;
  period: 'month' | 'six_months' | 'year';
  plan_id: string;
  price_without_savings: string;
  price: number;
  title: string;
  plan_num_seats?: number;
  custom_name?: string;
  is_bank_debit_enabled: boolean;
};

export type PlanCoupon = {
  discount_percent?: number;
  amount_in_cents?: number;
  description: string;
  code: string;
  coupon_id: string;
};

export enum CouponStatus {
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  RESET = 'RESET',
}

export enum PaymentMethod {
  CREDITCARD = 'credit_card',
  PAYPAL = 'paypal',
  PAYTM = 'paytm',
}

export type PaypalToken = {
  id: string;
};

export type DispatchPaypalErrors = (errors: string, fullMsg: string) => void;

export enum PaymentMethodBusiness {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_DEBIT = 'bank_debit',
}

export enum BusinessTransactionType {
  CONVERT_TRIAL = 'convertTrial',
  RENEW = 'renew',
  UPSELL = 'upsell',
}
