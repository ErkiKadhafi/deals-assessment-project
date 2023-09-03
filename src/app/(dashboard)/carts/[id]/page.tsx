import { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCartDetails } from "@/lib/cartData";
import { DollarSign, Scale, Shirt, User } from "lucide-react";
import { columns } from "./column";
import TableCartDetails from "@/components/carts/TableDetailCart";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Cart Details",
};

type CartDetailsPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CartDetailsPage({
  params,
}: CartDetailsPageProps) {
  const res = await getCartDetails(params.id);

  if (res.status === "error") notFound();
  
  const { products, userId, discountedTotal, totalProducts, totalQuantity } =
    res.data;

  const statsData = [
    {
      label: "User Id",
      value: userId,
      icon: User,
    },
    {
      label: "Total Price",
      value: `$ ${discountedTotal}`,
      icon: DollarSign,
    },
    {
      label: "Total Products",
      value: totalProducts + " " + (totalProducts > 1 ? "items" : "item"),
      icon: Shirt,
    },
    {
      label: "Total Quantity",
      value: totalQuantity + " " + (totalQuantity > 1 ? "items" : "item"),
      icon: Scale,
    },
  ];

  return (
    <main className="px-4 py-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((data) => (
          <Card key={data.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium">{data.label}</h2>
              <data.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="px-6 pt-6 pb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Cart's Detail</h2>
        </CardHeader>
        <CardContent>
          <TableCartDetails columns={columns} data={products} />
        </CardContent>
      </Card>
    </main>
  );
}
