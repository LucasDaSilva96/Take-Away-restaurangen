'use client';
import { Order_Get } from '@/types/order';
import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type ChartProps = {
  items: Order_Get[];
};

export default function OrdersChart({ items }: ChartProps) {
  const pendingData = items.filter((item) => item.status === 'pending');
  const completedData = items.filter((item) => item.status === 'ready');

  const data = [
    { status: 'Pending', value: pendingData.length },
    { status: 'Completed', value: completedData.length },
  ];
  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='status' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='value' fill='#B42638' label />
      </BarChart>
    </ResponsiveContainer>
  );
}
