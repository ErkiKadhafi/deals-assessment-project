import { Cart } from "@/app/(dashboard)/carts/column";

export type PaginationType = {
  limit: number;
  skip: number;
  total: number;
};

type CartListTypes = {
  carts: Cart[];
} & PaginationType;

type CartDetailsType =
  | { status: "success"; data: Cart }
  | { status: "error"; message: string };

export async function getAllCarts(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<CartListTypes> {
  const skipQuery =
    typeof searchParams.skip === "string" ? searchParams.skip : "0";
  const limitQuery =
    typeof searchParams.limit === "string" ? searchParams.limit : "10";

  const url = new URL("https://dummyjson.com/carts");
  url.searchParams.append("skip", skipQuery);
  url.searchParams.append("limit", limitQuery);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  return json;
}

export async function getCartDetails(id: string): Promise<CartDetailsType> {
  const url = new URL("https://dummyjson.com/carts/" + id);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  if (json.hasOwnProperty("message"))
    return { status: "error", message: json.message };

  return { status: "success", data: json };
}
