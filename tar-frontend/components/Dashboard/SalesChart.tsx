'use client';
import { Menu_Get } from '@/types/menu';
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
  items: Menu_Get[];
};

export default function Chart({ items }: ChartProps) {
  const data = items.map((item) => ({
    name: item.title,
    value: item.numberOfSales,
  }));

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
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='value' fill='#EBA13D' label />
      </BarChart>
    </ResponsiveContainer>
  );
}
