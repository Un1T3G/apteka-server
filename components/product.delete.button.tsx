import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export const ProductDeleteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["products", id],
    mutationFn: async () => {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      return await response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return (
    <Button size="icon" variant="destructive" onClick={() => mutate()}>
      <Trash />
    </Button>
  );
};
