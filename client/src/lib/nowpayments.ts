export interface PaymentEstimate {
  currency_from: string;
  amount_from: number;
  currency_to: string;
  estimated_amount: number;
}

export interface CreatePaymentRequest {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id: string;
  order_description?: string;
}

export interface PaymentResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentStatus {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  created_at: string;
  updated_at: string;
}

export class NOWPaymentsService {
  private baseURL = '/api/nowpayments';

  async getStatus(): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/status`);
    if (!response.ok) {
      throw new Error('Failed to fetch NOWPayments status');
    }
    return response.json();
  }

  async getCurrencies(): Promise<{ currencies: string[] }> {
    const response = await fetch(`${this.baseURL}/currencies`);
    if (!response.ok) {
      throw new Error('Failed to fetch supported currencies');
    }
    return response.json();
  }

  async getEstimate(
    amount: number,
    currencyFrom: string,
    currencyTo: string
  ): Promise<PaymentEstimate> {
    const params = new URLSearchParams({
      amount: amount.toString(),
      currency_from: currencyFrom,
      currency_to: currencyTo,
    });

    const response = await fetch(`${this.baseURL}/estimate?${params}`);
    if (!response.ok) {
      throw new Error('Failed to get payment estimate');
    }
    return response.json();
  }

  async createPayment(paymentData: CreatePaymentRequest): Promise<PaymentResponse> {
    const response = await fetch(`${this.baseURL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create payment');
    }
    
    return response.json();
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const response = await fetch(`${this.baseURL}/payment/${paymentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }
    return response.json();
  }

  getPaymentStatusText(status: string): string {
    switch (status) {
      case 'waiting':
        return 'Väntar på betalning';
      case 'confirming':
        return 'Bekräftar betalning';
      case 'confirmed':
        return 'Betalning bekräftad';
      case 'finished':
        return 'Betalning slutförd';
      case 'failed':
        return 'Betalning misslyckades';
      case 'refunded':
        return 'Betalning återbetalad';
      case 'expired':
        return 'Betalning förfallen';
      default:
        return 'Okänd status';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'waiting':
      case 'confirming':
        return 'text-yellow-600';
      case 'confirmed':
      case 'finished':
        return 'text-green-600';
      case 'failed':
      case 'expired':
        return 'text-red-600';
      case 'refunded':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  }
}

export const nowPayments = new NOWPaymentsService();
