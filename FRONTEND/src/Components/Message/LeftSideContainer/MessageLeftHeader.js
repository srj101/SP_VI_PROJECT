import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";

function MessageLeftHeader() {
    const [isIconBlock, setIsIconBlock] = useState(true)
    const handleOnBlur = (p) =>{
        setIsIconBlock(p)
    }
    return (


        <div className="mx-5">
            <div className="flex flex-row items-center">
                <div className="text-xl font-semibold">Messages</div>
                <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">5</div>
            </div>
            <div className="my-5 relative">
               
            <input type="text" placeholder="Search" onFocus={()=>{handleOnBlur(false)}} onBlur={()=>{handleOnBlur(true)}} className="input input-bordered input-primary w-full my-0" />
            <div className={` top-[15px] left-[270px] ${isIconBlock? 'absolute' : 'hidden' }`}>
            <AiOutlineSearch></AiOutlineSearch>
            </div>
            </div>
            
        </div>

    )
}

export default MessageLeftHeader
