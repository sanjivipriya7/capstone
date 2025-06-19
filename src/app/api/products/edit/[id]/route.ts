import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import formidable from "formidable";

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

async function parseForm(req: Request): Promise<{ fields: any; files: any }> {
  const form = formidable({ multiples: false, keepExtensions: true });

  const buffers: Buffer[] = [];
  const readable = req.body as unknown as NodeJS.ReadableStream;

  for await (const chunk of readable) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers);

  return new Promise((resolve, reject) => {
    form.parse(
      new IncomingMessageMock(data, req.headers),
      (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      }
    );
  });
}

class IncomingMessageMock {
  constructor(private data: Buffer, private headers: Headers) {}

  headers: Record<string, string> = Object.fromEntries(this.headers.entries());

  method = "POST";
  url = "";

  on(event: string, callback: (chunk: Buffer) => void) {
    if (event === "data") callback(this.data);
    if (event === "end") callback(null as any);
  }

  resume() {}
  pipe() {}
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { fields, files } = await parseForm(req);
  const { name, price, weight, description } = fields;

  let updateData: any = {
    name: String(name),
    price: parseFloat(price),
    weight: parseFloat(weight),
    description: String(description),
  };

  const file = files.image?.[0];
  if (file && file.filepath) {
    const bytes = await fs.promises.readFile(file.filepath);
    const fileName = Date.now() + "-" + file.originalFilename;
    const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(uploadPath, bytes);
    updateData.image = `/uploads/${fileName}`;
  }

  await prisma.product.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.redirect(new URL("/products", req.url));
}
