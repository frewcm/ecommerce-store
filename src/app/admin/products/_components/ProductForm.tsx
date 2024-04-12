"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export function ProductForm({
  product,
}: {
  product: Product | undefined | null;
}) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          defaultValue={product?.name || ""}
          type="text"
          id="name"
          name="name"
          required
        />
        {typeof error === "object" && error.name && (
          <div className="text-destructive">{error.name}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        {typeof error === "object" && error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          defaultValue={product?.description || ""}
          id="description"
          name="description"
          required
        />
        {typeof error === "object" && error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {typeof error === "object" && error.file && (
          <div className="text-destructive">{error.file}</div>
        )}
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {typeof error === "object" && error.image && (
          <div className="text-destructive">{error.image}</div>
        )}
        {product != null && (
          <Image
            src={product.imagePath}
            height={300}
            width={300}
            alt="product image"
          />
        )}
      </div>
      <SumbitButton />
    </form>
  );
}

function SumbitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="disabled:">
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
