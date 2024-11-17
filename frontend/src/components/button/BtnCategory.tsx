import { Button } from "@material-tailwind/react";
import { useDeleteProduct } from "../../hook/product.hook";

const BtnProduct = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteProduct();
  return (
    <Button color="red" loading={isPending} onClick={() => mutate(id)}>
      {isPending ? "Loading" : "Delete"}
    </Button>
  );
};

export default BtnProduct;
