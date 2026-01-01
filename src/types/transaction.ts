
export interface AmountFormProps {
  amount: string;
  onAmountChange: (value: string) => void;
  onGenerateQR: () => void;
  isLoading?: boolean;
}

export interface QRCodeDisplayProps {
  qrCodeUrl: string;
  amount: string;
  timeLeft: number;
  onReset: () => void;
  onConfirm: () => void;
}

export interface CountdownTimerProps {
  timeLeft: number;
  className?: string;
}

export interface QRCodeImageProps {
  qrCodeUrl: string;
  amount: string;
  alt?: string;
  className?: string;
}

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired';

export type PaymentMethod = 'bank_transfer' | 'promptpay' | 'truewallet' | 'credit_card';

export interface TransactionData {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt?: Date;
  reference?: string;
  qrCodeUrl?: string;
  expiresAt?: Date;
}

export interface DepositRequest {
  amount: number;
  method: PaymentMethod;
  userId: string;
}

export interface DepositResponse {
  transactionId: string;
  qrCodeUrl?: string;
  reference: string;
  expiresAt: Date;
  status: TransactionStatus;
}

// Withdraw Transaction Types
export interface WithdrawRequest {
  amount: number;
  bankAccount: string;
  userId: string;
}

export interface WithdrawResponse {
  transactionId: string;
  reference: string;
  estimatedTime: string;
  status: TransactionStatus;
}

export interface BankAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  isActive: boolean;
}

export interface TransactionHistoryItem {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: TransactionStatus;
  method: PaymentMethod;
  createdAt: Date;
  reference: string;
  description?: string;
}

export interface TransactionHistoryFilter {
  type?: 'deposit' | 'withdraw';
  status?: TransactionStatus;
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  offset?: number;
}

export interface MissionsHistroy {
  id: string;
  name: string;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface TransactionHistory {
  id: string;
  type: string;
  amount: number;
  beforeBalance: number;
  afterBalance: number;
  status: string;
  memberBank: {
    bank_number: string;
    bank_code: string;
    bank_name: string;
  } | null;
  promotion: {
    bonusadmin: {
      name: string;
    };
  } | null;
  createdAt: string;
}


export interface TruemoneyWalletHookProps {
  account_num: string;
  name: string;
}

export interface TruemoneyWalletHook {
  id: string;
  code: string;
  name: string;
  group: string;
  number: string;
  accountType: string;
  createdAt: string;
}

export interface BetTransactionHistory {
  _id: string;
  id: string;
  txn_id: string;
  productId: string;
  username: string;
  timestampMillis: string;
  status: string;
  roundId: string;
  betAmount: number;
  payoutAmount: number;
  gameCode: string;
  isFeature: boolean | null;
  isEndRound: boolean;
  isSingleState: boolean;
  transactionType: string;
  turnOver: number | null;
  isFeatureBuy: boolean | null;
  skipBalanceUpdate: boolean | null;
  createdAt: string;
  updatedAt: string;
  beforeBet: number;
  afterBet: number;
  isCalculate: boolean;
  memberId: string;
};
