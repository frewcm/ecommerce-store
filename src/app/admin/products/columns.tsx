"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductActions";

export type Product = {
  id: string;
  name: string;
  priceInCents: number;
  isAvailableForPurchase: boolean;
  _count: {
    order: number;
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "isAvailableForPurchase",
    header: "Status",
    cell: ({ row }) => {
      const isAvailable = row.original.isAvailableForPurchase;
      return (
        <div className="flex">
          {isAvailable ? (
            <span>
              <span className="sr-only">Available</span>
              <CheckCircle2 className="text-green-500" size={20} />
            </span>
          ) : (
            <div>
              <span className="sr-only">Unabailable</span>
              <XCircle className="text-red-500" size={20} />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "priceInCents",
    header: "Price",
  },

  {
    accessorKey: "_count.order",
    header: "Orders",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a download href={`/admin/products/${product.id}/download`}>
                Download
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link download href={`/admin/products/${product.id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ActiveToggleDropdownItem
              id={product.id}
              isAvailableForPurchase={product.isAvailableForPurchase}
            />
            <DropdownMenuSeparator />
            <DeleteDropdownItem
              id={product.id}
              disabled={product._count.order > 0}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
