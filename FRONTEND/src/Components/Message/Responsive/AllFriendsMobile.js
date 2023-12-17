import React, { useLayoutEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import people from '../../../Asset/Dummy/activeStatus.json'
import Loading from '../../../Shared/Loading/Loading';
import AllFriendsRow from './AllFriendsRow';

const AllFriendsMobile = () => {
    const [activeMembers, setActiveMember] = useState([])
    const activeStatusParams = useParams()

    const getActiveMember = async () => {
        setActiveMember(people)
        return activeMembers
    }

    useLayoutEffect(() => {
        getActiveMember(activeStatusParams.id)
    }, [])
    console.log(activeMembers)
    return (
        <div className='my-5 scrollable-component'>
            <InfiniteScroll
                dataLength={activeMembers.length}
                loader={<Loading></Loading>}
            >
                <div className='flex items-center gap-5'>
                    {
                        activeMembers.length &&
                        activeMembers.map(activeMember => <AllFriendsRow key={activeMember} activeMember={activeMember}></AllFriendsRow>)
                    }
                </div>

            </InfiniteScroll>

        </div>
    );
};

export default AllFriendsMobile;