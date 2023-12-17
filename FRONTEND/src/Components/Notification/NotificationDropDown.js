import { Button, Drawer } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../../Asset/person/profile.png'
import NotificationData from '../../Asset/Dummy/Notification'
const NotificationItem = ({ item }) => {
    const { name, message, time } = item // destructuring
    return (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <Link to="#" className="flex py-3  hover:bg-gray-100 dark:hover:bg-gray-700">
                <img className="w-11 h-11 rounded-full" src={profilePic} alt="image" />
                {/* <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                            </div> */}

                <div className="pl-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{name} <span className="font-semibold text-gray-900 dark:text-white">{message}</span></div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">{time}</div>
                </div>
            </Link>

        </div>
    )
}

function NotificationDropDown(props) {
    const { notificationOpen, setNotificationOpen } = props

    return (
        <>
            <div className="absolute flex flex-col  z-20 top-[70px] overflow-y-scroll  w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700 right-[0] h-[300px]" >
                <div className='flex justify-between items-center'>
                    <div className="font-medium">
                        Notifications
                    </div>
                    <div>
                        <button onClick={() => setNotificationOpen(prev => !prev)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close</span>

                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start'>
                    {

                        NotificationData.length > 0 ? NotificationData.map((item, index) => {
                            return (
                                <NotificationItem key={index} item={item} />
                            )
                        }) : <div className="text-center py-4">No Notification</div>
                    }
                </div>
            </div>

        </>
    )
}

export default NotificationDropDown
