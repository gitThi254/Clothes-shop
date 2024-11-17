import { Button } from "@material-tailwind/react";
import { useDeleteProductItem } from "../../hook/product.item.hook";

const BtnProductItem = ({ id, itemId }: { id: string; itemId: string }) => {
  const { mutate, isPending } = useDeleteProductItem({ id });
  return (
    <Button
      color="red"
      loading={isPending}
      onClick={() => mutate({ id, itemId })}
    >
      {isPending ? "Loading" : "Delete"}
    </Button>
  );
};

export default BtnProductItem;
