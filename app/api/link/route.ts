import { pool } from "@/lib/DB/pool";
import { LinkType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request:Request) {
    try {
        await pool.execute('CREATE TABLE IF NOT EXISTS links (link_id int not null AUTO_INCREMENT PRIMARY KEY,long_link varchar(4000), short_link varchar(256),short varchar(256),publish_date varchar(256))')
        const link:LinkType = await Request.json()

        if(!link.long_link){
            return NextResponse.json({
                status:false,
                message:"Inavalid Credintials"
            },{status:400})
        }
        const [rows]:any[] = await pool.execute('SELECT * FROM links WHERE long_link=?',[link.long_link])
        if(rows.length){
            console.log(rows[0]);
            
            return NextResponse.json(rows[0])
        }
        const link2 = MakeLink()
        const url = `${process.env.BASE_URL}/l/${link2}`
        await pool.execute('INSERT INTO links (long_link,short_link,publish_date,short) VALUES (?,?,?,?)',[link.long_link,url,new Date().toLocaleDateString(),link2])
        return NextResponse.json({
            short_link:url,
            long_link:link.long_link
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status:false,
            message:"Something Went Wrong",
        },{status:500})
    }
}

function MakeLink(){
const charachter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let link = ""
for(let i =0;i<5;i++){
    const randNum = Math.floor(Math.random()*charachter.length)
    link+=charachter[randNum]
}
return link
}

export async function GET(Request:NextRequest) {
    try {
        await pool.execute('CREATE TABLE IF NOT EXISTS links (link_id int not null AUTO_INCREMENT PRIMARY KEY,long_link varchar(256), short_link varchar(256),short varchar(256),publish_date varchar(256))')
        const id = Request.nextUrl.searchParams.get("id")
        const [rows,url]:any[]=await pool.execute('SELECT * FROM links WHERE short=?',[id])
        if(!rows?.length){
         
            
            return NextResponse.json({
                status:false,
                message:"id not found"
            },{status:404})
        }
        
        return NextResponse.json(rows[0])
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status:false,
            message:"Something Went Wrong",
        },{status:500})
    }
}
