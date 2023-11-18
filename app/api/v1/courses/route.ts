import { courseSchema } from "@/app/zod-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request:NextRequest ){
    const courses = await prisma.course.findMany();
    return NextResponse.json( courses )
}

export default async function POST( request:NextRequest ){
    const body = await request.json();
    const validation = courseSchema.safeParse(body);
  
    // Validate the request body
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
  
    // Create a new course
    const newCourse = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        thumbnail: body.thumbnail,
      },
    });
  
    return NextResponse.json(newCourse, { status: 201 });
}