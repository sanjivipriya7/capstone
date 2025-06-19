import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const weight = parseFloat(formData.get("weight") as string);
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;

  let imagePath = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuid()}-${imageFile.name}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(uploadPath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  await prisma.product.create({
    data: {
      name,
      price,
      weight,
      description,
      category, // ✅ Save category
      image: imagePath,
    },
  });

  return NextResponse.redirect("http://localhost:3000/products", 303);
}
