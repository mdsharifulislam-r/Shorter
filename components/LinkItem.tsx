import React, { useState } from 'react'
import { BsClipboard2 } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { BsClipboard2Check } from "react-icons/bs";
import Copy from 'clipboard-copy'
import { LinkType } from '@/types/types';
import { setStorLocal } from '@/lib/hooks/hooks';
export default function LinkItem({link,setLinks}:{link:LinkType,setLinks:React.Dispatch<React.SetStateAction<LinkType[]>>}) {
    const [copying,setCopying]=useState(false)
    const copy =async ()=>{
        setCopying(true)
        try {
            await Copy(link.short_link||"")
        } catch (error) {
            
        }
        setTimeout(()=>{
            setCopying(false)
        },3000)
    }

    function deleteItem(){
        setLinks(prev=>{
            const newArr = prev.filter(item=>item.short_link!=link.short_link)
            setStorLocal("links",newArr)
            return newArr
        })
    }
  return (
    <div className='w-full bg-slate-600 py-3 px-3 flex place-items-center justify-between'>
    <span className='text-white md:text-sm text-xs'>{link.long_link}</span>
    <div className='flex place-items-center gap-3'>
        <a href={link.short_link} className='text-blue-200 md:text-sm text-xs'>{link.short_link}</a>
        <div className='flex place-items-center gap-2 text-xl'>
            <button className='text-white' onClick={copy}>{copying?<BsClipboard2Check/>:<BsClipboard2/>}</button>
            <button className='text-red-500' onClick={deleteItem}><RxCross2/></button>
        </div>
    </div>
</div>
  )
}
