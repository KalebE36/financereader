import { useState, useCallback } from 'react';
import Papa from 'papaparse';

export interface Transaction {
  Date: string; // Date as a string
  Amount: number; // Transaction amount as a number
  Category: string; // Placeholder category
  Description: string; // Description of the transaction
}

export const useCSVParser = (): {
  transactions: Transaction[];
  parseCSV: (file: File) => void;
} => {
  // State to hold the parsed transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const parseCSV = useCallback((file: File) => {
    Papa.parse(file, {
      header: false, // Indicates that the CSV has no headers
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsing complete:', results); // Check the raw data here
  
        // Type assertion to treat data as an array of rows (each row being an array)
        const parsedTransactions = (results.data as any[][]).map((row) => {
          return {
            Date: String(row[0]), // Adjust the index to match the order of columns in your CSV
            Amount: Number(row[1]), // Adjust based on the column that contains the amount
            Category: '*', // Manually assign if there's no category column
            Description: String(row[4] || ''), // Adjust index if description is in a different column
          };
        });
  
        console.log('Parsed Transactions:', parsedTransactions);
        setTransactions(parsedTransactions);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);
  

  return { transactions, parseCSV };
};
