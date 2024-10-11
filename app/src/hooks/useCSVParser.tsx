import { useState } from 'react';
import Papa from 'papaparse';

export interface Transaction {
  Date: string;
  Amount: number;
  Category: string;
  Description: string;
}

interface CSVParserResult {
  transactions: Transaction[];
  loadCSV: (file: File) => void;
}

export const useCSVParser = (): CSVParserResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadCSV = (file: File) => {
    Papa.parse<Transaction>(file, {
      header: true,
      complete: (results) => {
        setTransactions(results.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  return { transactions, loadCSV };
};
