import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body: RequestBody = await req.json()
    const user = await prisma.user.findFirst({
        where: {
            email: body.username
        }
    })

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user
        return new NextResponse(JSON.stringify(userWithoutPass))
    } else return new NextResponse(JSON.stringify(null))
}
