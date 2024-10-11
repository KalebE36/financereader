import { useState, useCallback } from 'react';
import Papa from 'papaparse';

export interface Transaction {
  Date: string; // Date as a string
  Amount: number; // Transaction amount as a number
  Category: string; // Placeholder category
  Description: string; // Description of the transaction
}

export const useCSVParser = (): { transactions: Transaction[]; parseCSV: (file: File) => void } => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const parseCSV = useCallback((file: File) => {
    Papa.parse<Transaction>(file, {
      header: true,
      dynamicTyping: true, // Automatically converts strings to numbers where applicable
      skipEmptyLines: true, // Skips empty rows
      transformHeader: (header) => header.trim(), // Trims header whitespace
      complete: (results) => {
        const parsedTransactions = results.data.map((item) => {
          // Type assertion: treat item as a Transaction
          const transaction = item as Transaction;
          return {
            Date: String(transaction.Date), // Ensure Date is a string
            Amount: Number(transaction.Amount), // Ensure Amount is a number
            Category: String(transaction.Category || '*'), // Use '*' as default if undefined
            Description: String(transaction.Description || ''), // Ensure Description is a string
          };
        });

        setTransactions(parsedTransactions);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  return { transactions, parseCSV };
};
