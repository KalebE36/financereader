import React, { useState } from 'react';
import { useCSVParser, Transaction } from '../src/hooks/useCSVParser';
import FileUpload from '../src/components/FileUpload';
import TransactionChart, {CategoryData} from '../src/components/TransactionChart';

const App: React.FC = () => {
  const { transactions, parseCSV } = useCSVParser();
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  // Group and sum transactions by category for the visualization
  const calculateCategoryData = (transactions: Transaction[]) => {
    const data = transactions.reduce<Record<string, number>>((acc, transaction) => {
      acc[transaction.Category] = (acc[transaction.Category] || 0) + transaction.Amount;
      return acc;
    }, {});

    // Transform to array of objects for Recharts
    const formattedData: CategoryData[] = Object.entries(data).map(([category, total]) => ({
      category,
      total: Math.abs(total), // Use absolute value for visualization
    }));

    setCategoryData(formattedData);
  };

  // Update category data whenever transactions change
  React.useEffect(() => {
    if (transactions.length > 0) {
      calculateCategoryData(transactions);
    }
  }, [transactions]);

  return (
    <div className="bg-gray-600 h-full w-full">
      <h1>Bank Transaction Visualizer</h1>
      <FileUpload onFileUpload={parseCSV} />
      <TransactionChart data={categoryData} />
    </div>
  );
};

export default App;
