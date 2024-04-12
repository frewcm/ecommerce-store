import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import db from "@/db/db";

export default async function AdminProductPage() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { order: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href={"/admin/products/new"}>Add product</Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={products} />
      </div>
    </>
  );
}
