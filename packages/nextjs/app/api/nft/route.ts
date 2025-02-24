import { type NextRequest, NextResponse } from "next/server";
import { pinata } from "~~/utils/config";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const id: string | undefined = req.id;

    if (!id) {
      throw new Error(`No id`);
    }
    console.log(id);
    const data = await pinata.gateways.get(id);
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
