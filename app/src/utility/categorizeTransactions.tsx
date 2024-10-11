import { Transaction } from '../hooks/useCSVParser'

export interface CategoryData {
  category: string;
  total: number;
}

export const categorizeTransactions = (transactions: Transaction[]): CategoryData[] => {
    const categorized = transactions.reduce<Record<string, number>>((acc, transaction) => {
      // Here, you could parse the description to infer categories
      const category = getCategoryFromDescription(transaction.Description);
      const amount = transaction.Amount;
  
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
  
  // Example function to determine category from the description
  function getCategoryFromDescription(description: string): string {
    if (description.includes('PAYPAL')) return 'PayPal';
    if (description.includes('ZELLE')) return 'Zelle';
    if (description.includes('ONLINE TRANSFER')) return 'Transfer';
    if (description.includes('PURCHASE AUTHORIZED')) return 'Purchase';
    return 'Other';
  }
  