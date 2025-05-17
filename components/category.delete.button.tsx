import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export const CategoryDeleteButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["category", id],
    mutationFn: async () => {
      const response = await fetch(`/api/category/${id}`, { method: "DELETE" });
      return await response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
  });

  return (
    <Button size="icon" variant="destructive" onClick={() => mutate()}>
      <Trash />
    </Button>
  );
};
