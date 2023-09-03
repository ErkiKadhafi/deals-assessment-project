import { Product } from "@/app/(dashboard)/products/column";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useModalDetailsProduct = (init: Product) => {
  const [detailProduct, setDetailProduct] = useState({} as Product);

  return { detailProduct, setDetailProduct };
};

export default function ModalDetailProduct({
  detailProduct,
}: {
  detailProduct: Product;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        {/* <DialogTitle>{detailProduct.title}</DialogTitle> */}
        <DialogTitle>{detailProduct.title}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
