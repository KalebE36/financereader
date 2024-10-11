import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { CategoryData } from './categorizeTransactions';

interface TransactionChartProps {
  data: CategoryData[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="total"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label={({ category, total }) => `${category}: $${total}`}
      />
      <Tooltip />
    </PieChart>
  );
};

export default TransactionChart;
