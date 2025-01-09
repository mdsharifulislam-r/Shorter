'use client'
import { LinkType } from '@/types/types'
import React, { FormEvent, useEffect, useState } from 'react'
import { BsClipboard2 } from "react-icons/bs";
import { RxCross2 } from 'react-icons/rx';
import LinkItem from '../LinkItem';
import { getStorLocal, setStorLocal } from '@/lib/hooks/hooks';
export default function Form() {
    const localItem = getStorLocal("links")
    const [url,setUrl]=useState("")
    const [shortLink,setShortLink]=useState<LinkType[]>(localItem||[])
    const [loading,isLoading]=useState(false)
    async function submitUrl(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(!url){
            return
        }
        isLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL }/api/link`,{
            method:"POST",
            body:JSON.stringify({
                long_link:url
            })
        })
        const data = await res.json()
        
        if(data){
            if(!shortLink.some(item=>item.long_link==data.long_link)){
                setShortLink(prev=>{
                    const newArr = [...prev,data]
                    setStorLocal('links',newArr)
                    return newArr
                })
                
            }
            isLoading(false)
            setUrl("")
        }
        
    }
    const [hydred,setHydred]=useState(false)
    useEffect(()=>setHydred(true),[])
  return (
    <div className="md:w-[50%] w-full">
    <form onSubmit={submitUrl} className='w-full flex mb-3 place-items-center'>
      <input required value={url} type="url" onChange={(e)=>setUrl(e.target.value)} name=""  className='w-[80%] text-white px-3 py-3 rounded-l-md bg-slate-600 focus:outline-none' placeholder='URL Paste Here..' id="" />
      <button className={`w-[20%] py-3 ${loading?"bg-slate-400 cursor-progress pointer-events-none":"bg-yellow-400"} h-full rounded-r-md text-white font-bold`}>Short</button>
    </form>
    {hydred&&shortLink?.length? <div className='flex flex-col gap-2'>
        <div>
            <h1 className='text-xl text-slate-300'>Links</h1>
        </div>
       {
        shortLink.map((item,index)=>(
            <LinkItem setLinks={setShortLink} link={item}key={index}/>
        ))
       }
    </div>:""}
    </div>
    
  )
}
