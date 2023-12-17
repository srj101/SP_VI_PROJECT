import React from 'react';
import MessageLeftHeader from '../../Components/Message/LeftSideContainer/MessageLeftHeader';
import MessageSwtching from '../../Components/Message/LeftSideContainer/MessageSwtching';
import MessageRightBottom from '../../Components/Message/MessegeRightContainer/MessageRightBottom';
import MessegeRightHeader from '../../Components/Message/MessegeRightContainer/MessegeRightHeader';
import AllCommunityMobile from '../../Components/Message/Responsive/AllCommunityMobile';
import AllFriendsMobile from '../../Components/Message/Responsive/AllFriendsMobile';
import './Message.module.css'

const Message = () => {
    return (
        <div className="h-screen antialiased text-gray-800">
            <div className="w-96 hidden lg:block fixed  flex-shrink-0 bg-gray-100 pb-12 p-5   h-screen overflow-hidden hover:overflow-y-auto " >
                <div className=" w-full">
                    {/* Message Title and Search */}
                    <MessageLeftHeader />
                    {/* All Conversations, Archived, Starred */}
                    <MessageSwtching />
                   
                </div>
            </div>
            <div className='overflow-hidden  ml-0 lg:ml-[384px] px-5 block lg:hidden '>
                <AllFriendsMobile></AllFriendsMobile>
                <AllCommunityMobile></AllCommunityMobile>
            </div>
            <MessegeRightHeader />


        </div>

    );
};

export default Message;