"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export const ProductCreateModal = ({ categories }: { categories: { id: number; name: string }[] }) => {
  const form = useForm<{
    name: string;
    description: string;
    price: number;
    exprestion_date: string;
    categoryId: number;
    phone_number: string;
    location: string;
    image: string;
  }>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      exprestion_date: "",
      categoryId: 0,
      phone_number: "",
      location: "",
      image: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (dto: any) => {
      await fetch("/api/products", { method: "POST", body: JSON.stringify(dto) });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
  const onSubmit = (data: any) =>
    mutate({
      ...data,
      categoryId: parseInt(data.categoryId),
      price: parseInt(data.price),
    });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tovar jaratiw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tovar jaratiw</DialogTitle>
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
                    <Input placeholder="Tovar ati..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xarakteristika</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tovar xarakteristikasi " {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suwret</FormLabel>
                  <FormControl>
                    <Input placeholder="Suwret siltemesi..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manzili</FormLabel>
                  <FormControl>
                    <Input placeholder="Manzili..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tel nomeri</FormLabel>
                  <FormControl>
                    <Input placeholder="Tel nomeri..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Senasi..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="exprestion_date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muddeti</FormLabel>
                  <FormControl>
                    <Input placeholder="Muddeti..." {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategoriya</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Kategoriya..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id.toString()} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
