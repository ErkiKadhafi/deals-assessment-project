import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="px-4 py-6">
      <Card>
        <CardHeader className="px-6 pt-6 pb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">
            All User's Carts
          </h1>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full bg-gray-200 animate-pulse rounded-md" />
        </CardContent>
      </Card>
    </main>
  );
}
