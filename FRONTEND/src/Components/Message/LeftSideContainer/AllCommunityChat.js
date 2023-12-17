import React from 'react';

const AllCommunityChat = ({ activeMember }) => {
    
    const { id, userName, userImg } = activeMember;
    return (
        <div>

        <button className=' hover:bg-slate-200 p-5 rounded-lg'>
            <div className='flex items-center'>
                <div className='mr-3'>
                    <div className="avatar online">
                        <div className="w-8 rounded-full">
                            <img src={userImg} alt={userName}/>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>{userName}</h1>
                </div>
            </div>
        </button>
        </div>
    );
};

export default AllCommunityChat;