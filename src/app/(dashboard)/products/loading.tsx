import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
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
            <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded-md" />
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader className="px-6 pt-6 pb-6">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Top 5 Quantity
            </h1>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {[...Array(5)].map((product, index) => (
                <li
                  key={index}
                  className="flex items-center bg-gray-200 animate-pulse rounded-md"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      placholder
                    </p>
                    <p className="text-sm text-gray-200">placeholder</p>
                  </div>
                  <div className="ml-auto font-medium text-gray-200">
                    placeholder
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="px-6 pt-6 pb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">All Products</h1>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded-md" />
        </CardContent>
      </Card>
    </main>
  );
}
