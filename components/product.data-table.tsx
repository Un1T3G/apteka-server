"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductDeleteButton } from "./product.delete.button";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export const ProductDataTable = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`/api/products`);
      return await response.json();
    },
  });
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Juklenip atir...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Ati</TableHead>
            <TableHead>Manzili</TableHead>
            <TableHead>Tel nomeri</TableHead>
            <TableHead>Bahasi</TableHead>
            <TableHead>Kategoriyasi</TableHead>
            <TableHead className="text-right">Háreketler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product: any, index: number) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.location}</TableCell>
              <TableCell>{product.phone_number}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex justify-end">
                <ProductDeleteButton id={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
