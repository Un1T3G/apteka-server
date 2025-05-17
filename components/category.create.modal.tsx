"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export const CategoryCreateModal = () => {
  const form = useForm<{
    name: string;
  }>({
    defaultValues: {
      name: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["category"],
    mutationFn: async (dto: any) => {
      await fetch("/api/category", { method: "POST", body: JSON.stringify(dto) });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] }),
  });
  const onSubmit = (data: any) => mutate(data);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Kategoriya jaratiw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kategoriya jaratiw</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ati</FormLabel>
                  <FormControl>
                    <Input placeholder="Kategoriya ati..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Jaratiw
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
