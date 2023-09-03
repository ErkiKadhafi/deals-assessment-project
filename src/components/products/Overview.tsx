"use client";

import { Product } from "@/app/(dashboard)/products/column";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMemo } from "react";

export function Overview({ products }: { products: Product[] }) {
  const data = useMemo(
    () => products.sort((a, b) => b.stock - a.stock).slice(0, 5),
    [products]
  );

  return (
    <ul className="space-y-6">
      {data.map((product) => (
        <li key={product.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{product.title}</p>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <div className="ml-auto font-medium">{product.stock} items</div>
        </li>
      ))}
    </ul>
  );
}
