import db from "@/db/db";
import { NextRequest } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true },
  });
  if (product == null) return "Not found";
  const { size } = await fs.stat(product.filePath);
}
