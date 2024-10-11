import React, { useEffect, useState } from 'react';
import { useCSVParser, Transaction } from '../src/hooks/useCSVParser';
import { categorizeTransactions, CategoryData } from '../src/utility/categorizeTransactions';
import TransactionChart from '../src/components/TransactionChart';
import FileUploader from '../src/components/FileUpload';

const App: React.FC = () => {
  const { transactions, parseCSV } = useCSVParser();
  const [chartData, setChartData] = useState<CategoryData[]>([]);

  useEffect(() => {
    if (transactions.length > 0) {
      console.log('Transactions updated:', transactions); // Log to verify state update
      const data = categorizeTransactions(transactions);
      setChartData(data);
    }
  }, [transactions]);

  return (
    <div className="app-container">
      <h1>Transaction Visualizer</h1>
      <FileUploader onFileUpload={parseCSV} />
      {transactions.length > 0 ? (
        <pre>{JSON.stringify(transactions, null, 2)}</pre> // Display parsed transactions
      ) : (
        <p>No transactions loaded yet.</p>
      )}
      <TransactionChart data={chartData} />
    </div>
  );
};


export default App;
