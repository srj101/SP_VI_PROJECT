import React from 'react';

const AllFriendsRow = ({ activeMember }) => {
    const { id, userName, userImg } = activeMember;
    return (
        <div>
            <div className="avatar">
                <div className="w-8 rounded-full">
                    <img src={userImg} alt={userName}/>
                </div>
            </div>
            <div>
                <p>
                    {userName}
                </p>
            </div>
        </div>
    );
};

export default AllFriendsRow;