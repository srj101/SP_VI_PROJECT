import React from 'react'

function MessageRightBottom() {
    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">

                <div className="w-full">
                    <input type="text"
                        className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...." />
                </div>

            </div>
            <div className="ml-6">
                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white">
                    <svg className="w-5 h-5 transform rotate-90 -mr-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default MessageRightBottom
