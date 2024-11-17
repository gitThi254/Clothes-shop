import { Button } from "@material-tailwind/react";
import { useDeleteCategory } from "../../hook/category.hook";

const BtnCategory = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteCategory();
  return (
    <Button color="red" loading={isPending} onClick={() => mutate(id)}>
      {isPending ? "Loading" : "Delete"}
    </Button>
  );
};

export default BtnCategory;
