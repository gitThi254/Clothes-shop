import { Button } from "@material-tailwind/react";
import { useDeleteUser } from "../../hook/user.hook";

const BtnUser = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteUser();
  return (
    <Button color="red" loading={isPending} onClick={() => mutate(id)}>
      {isPending ? "Loading" : "Delete"}
    </Button>
  );
};

export default BtnUser;
