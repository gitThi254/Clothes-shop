import { Button } from "@material-tailwind/react";
import { useDeleteAddress } from "../../hook/address.hook";

const BtnAddress = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteAddress();
  return (
    <Button color="red" loading={isPending} onClick={() => mutate(id)}>
      {isPending ? "Loading" : "Delete"}
    </Button>
  );
};

export default BtnAddress;
