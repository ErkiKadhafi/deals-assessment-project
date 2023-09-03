import { columns } from "./column";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TableProducts from "@/components/products/TableProducts";
import { getAllProducts } from "@/lib/productsData";
import { Metadata } from "next";
import { ChartProducts } from "@/components/products/ChartProducts";
import { Overview } from "@/components/products/Overview";

export const metadata: Metadata = {
  title: "All Products",
};

type ProductsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { products, ...paginationData } = await getAllProducts(searchParams);

  return (
    <main className="px-4 py-6 space-y-4">
      <div className="flex flex-col xl:grid xl:grid-cols-5 gap-4">
        <Card className="xl:col-span-3">
          <CardHeader className="px-6 pt-6 pb-6">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Products Quantity
            </h1>
          </CardHeader>
          <CardContent>
            <ChartProducts products={products} />
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader className="px-6 pt-6 pb-6">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Top 5 Quantity
            </h1>
          </CardHeader>
          <CardContent>
            <Overview products={products} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="px-6 pt-6 pb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">All Products</h1>
        </CardHeader>
        <CardContent>
          <TableProducts
            columns={columns}
            data={products}
            paginationData={paginationData}
          />
        </CardContent>
      </Card>
    </main>
  );
}
