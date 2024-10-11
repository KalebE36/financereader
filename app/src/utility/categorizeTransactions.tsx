import { Transaction } from '../hooks/useCSVParser'

export interface CategoryData {
  category: string;
  total: number;
}

export const categorizeTransactions = (transactions: Transaction[]): CategoryData[] => {
  const categorized = transactions.reduce<Record<string, number>>((acc, transaction) => {
    const category = transaction.Category || 'Uncategorized';
    const amount = parseFloat(transaction.Amount.toString());
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  return Object.entries(categorized).map(([category, total]) => ({
    category,
    total,
  }));
};
