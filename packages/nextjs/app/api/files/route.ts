import { type NextRequest, NextResponse } from "next/server";
import { pinata } from "~~/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const name: string | undefined = data.get("name")?.toString();
    const tags: string | undefined = data.get("tags")?.toString();
    const description: string | undefined = data.get("description")?.toString();
    if (!name || !description) {
      throw new Error(`No name or description `);
    }
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file).addMetadata({
      keyValues: {
        name: name,
        description: description,
      },
    });

    const url = await pinata.gateways.convert(uploadData.IpfsHash);
    const view = {
      name: name,
      description: description,
      external_url: "https://pinata.cloud",
      image: url,
      tags: tags,
      quantity: data.get("quantity")?.toString() || "",
      date: data.get("harvestDate")?.toString() || "",
    };

    const uploadJson = await pinata.upload.json(view);
    const jsonurl = await pinata.gateways.convert(uploadJson.IpfsHash);
    return NextResponse.json({ url, jsonurl }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
