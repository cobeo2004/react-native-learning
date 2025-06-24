import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt"

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body: RequestBody = await req.json()
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    })

    const { password, ...result } = user;

    return new NextResponse(JSON.stringify(result))
}
