import { useState, useCallback } from 'react';
import Papa from 'papaparse';

// Define the interface for a transaction
export interface Transaction {
  Date: string; // Date as a string
  Amount: number; // Transaction amount as a number
  Category: string; // Category for the transaction
  Description: string; // Description of the transaction
}

// Create a custom hook for parsing CSV data
export const useCSVParser = (): {
  transactions: Transaction[];
  parseCSV: (file: File) => void;
} => {
  // State to hold the parsed transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Function to parse the CSV file
  const parseCSV = useCallback((file: File) => {
    Papa.parse(file, {
      header: false, // Indicates that the CSV has no headers
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsing complete:', results); // Log the raw data for debugging

        // Map over the parsed data to transform it into Transaction objects
        const parsedTransactions = (results.data as any[][]).map((row) => {
          return {
            Date: String(row[0]), // Adjust the index if the date is in a different column
            Amount: Number(row[1]), // Adjust based on the column that contains the amount
            Category: categorizeTransaction(String(row[4] || '')), // Adjust index for description
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

  // Function to categorize a transaction based on its description
  function categorizeTransaction(description: string): string {
    if (description.includes("ZELLE")) return "Transfer";
    if (description.includes("PAYPAL") || description.includes("PURCHASE")) return "Shopping";
    if (description.includes("University")) return "Income";
    if (description.includes("ONLINE TRANSFER")) return "Transfer";
    return "Other";
  }

  return { transactions, parseCSV };
};
