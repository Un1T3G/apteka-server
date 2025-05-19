import { CategoryCreateModal } from "@/components/category.create.modal";
import { CategoryDataTable } from "@/components/category.data-table";
import { ProductCreateModal } from "@/components/product.create.modal";
import { ProductDataTable } from "@/components/product.data-table";
import { NoSSR } from "@/lib/no-ssr";

export const revalidate = 0;

async function getCategories() {
  const response = await fetch(`${process.env.CLIENT_URL}/api/category`);
  return await response.json();
}

export default async function Page() {
  const categories = (await getCategories()) as { id: number; name: string }[];

  return (
    <NoSSR>
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Kategoriya</h1>
            <CategoryCreateModal />
          </div>
          <CategoryDataTable />
          <div className="flex items-center justify-between my-4">
            <h1 className="text-xl font-bold">Tovarlar</h1>
            <ProductCreateModal categories={categories} />
          </div>
          <ProductDataTable />
        </div>
      </div>
    </NoSSR>
  );
}
