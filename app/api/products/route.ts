import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  const whereClause = categoryId ? { categoryId: parseInt(categoryId) } : {};

  const products = await prisma.product.findMany({
    where: whereClause,
    include: { category: true },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, categoryId, price, description, image, exprestion_date, location, phone_number } = data;

  const product = await prisma.product.create({
    data: {
      name,
      categoryId: parseInt(categoryId),
      price: parseFloat(price),
      description,
      image,
      exprestion_date,
      location,
      phone_number,
    },
    include: { category: true },
  });

  return NextResponse.json(product);
}
