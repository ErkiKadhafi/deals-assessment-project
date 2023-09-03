"use client";

import { Product } from "@/app/(dashboard)/products/column";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ChartProducts({ products }: { products: Product[] }) {
  const data = products.map((product) => ({
    name: product.title,
    total: product.stock,
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `${value} item`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
