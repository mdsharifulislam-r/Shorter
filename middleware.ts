import { NextRequest, NextResponse } from "next/server";

export async function middleware(Request:NextRequest) {
    try {
        const url = await Request.nextUrl.pathname
        const sliceUrl = url.slice(3,url.length)
        const res = await fetch(`${process.env.BASE_URL}/api/link?id=${sliceUrl}`)
        const data = await res.json()
        if(!data.message){
            return NextResponse.redirect(new URL(data?.long_link,Request.url))
        }else{
            NextResponse.redirect(new URL("/",Request.url))
        }
        
        
        
    } catch (error) {
        
    }
}

export const config = {
    matcher:['/l/:path*']
}