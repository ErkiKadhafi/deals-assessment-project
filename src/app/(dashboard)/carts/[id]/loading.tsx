import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign, Scale, Shirt, User } from "lucide-react";

const statsData = [
  {
    label: "User Id",
    value: "placeholder",
    icon: User,
  },
  {
    label: "Total Price",
    value: "placeholder",
    icon: DollarSign,
  },
  {
    label: "Total Products",
    value: "placeholder",
    icon: Shirt,
  },
  {
    label: "Total Quantity",
    value: "placeholder",
    icon: Scale,
  },
];

export default function Loading() {
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
              <p className="text-2xl font-bold text-gray-200 bg-gray-200 animate-pulse rounded-md">
                {data.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="px-6 pt-6 pb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Cart's Detail</h2>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded-md" />
        </CardContent>
      </Card>
    </main>
  );
}
