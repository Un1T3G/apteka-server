import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	await prisma.category.delete({ where: { id: parseInt(params.id) } });
	return NextResponse.json({ message: "Deleted successfully" });
}
