import { Metadata } from "next";

import { columns } from "./column";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TableCarts from "@/components/carts/TableCarts";
import { getAllCarts } from "@/lib/cartData";

export const metadata: Metadata = {
  title: "User's Carts",
};

type CartsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CartsPage({ searchParams }: CartsPageProps) {
  const { carts, ...paginationData } = await getAllCarts(searchParams);

  return (
    <main className="px-4 py-6">
      <Card>
        <CardHeader className="px-6 pt-6 pb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">
            All User's Carts
          </h1>
        </CardHeader>
        <CardContent>
          <TableCarts
            columns={columns}
            data={carts}
            paginationData={paginationData}
          />
        </CardContent>
      </Card>
    </main>
  );
}
