import { patchCourseSchema } from "@/app/zod-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";




export  async function PATCH( request:NextRequest , { params }:{ params:{ id:string}} ){

    const body = await request.json();
    const validation = patchCourseSchema.safeParse( body );
    
    if( !validation.success ) return NextResponse.json( validation.error.format() , {status:400 });
    const { title , description , assignedTo , status } = body
    
    

    const course = await prisma.course.findUnique({ where:{ id:parseInt( params.id )}})

    if( !course ) return NextResponse.json( 'Course Not Found' , {status:404 }); 

    const updatedIssue = await prisma.course.update({
        where:{ id:parseInt( params.id )},
        data:{ title  , description  }
    })

    return NextResponse.json( updatedIssue);

}


export async function GET( request:NextRequest , { params }:{ params:{ id:string}}){
    const course = await prisma.course.findUnique({ where:{ id:parseInt( params.id )}})

    if( !course ) return NextResponse.json( 'Course Not Found' , {status:404 }); 

    return NextResponse.json( course );
}


export async function DELETE( request:NextRequest , { params }:{ params:{ id:string}}){

    const course = await prisma.course.findUnique({ where:{ id:parseInt( params.id )}})

    if( !course ) return NextResponse.json( 'Course Not Found' , {status:404 }); 

    const deletedCourse = await prisma.course.delete({
        where:{ id: parseInt( params.id)}
    })

    return NextResponse.json( deletedCourse );
}