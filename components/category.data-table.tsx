"use client";

import { useQuery } from "@tanstack/react-query";
import { CategoryDeleteButton } from "./category.delete.button";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export const CategoryDataTable = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/category`);
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
            <TableHead className="text-right">Háreketler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category: any, index: number) => (
            <TableRow key={category.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="flex justify-end">
                <CategoryDeleteButton id={category.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
