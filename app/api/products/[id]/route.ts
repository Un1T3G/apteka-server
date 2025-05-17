import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const product = await prisma.product.findUnique({
		where: { id: parseInt(params.id) },
		include: { category: true },
	});
	return NextResponse.json(product);
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const data = await req.json();
	const product = await prisma.product.update({
		where: { id: parseInt(params.id) },
		data,
	});
	return NextResponse.json(product);
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	await prisma.product.delete({ where: { id: parseInt(params.id) } });
	return NextResponse.json({ message: "Deleted successfully" });
}
