import React,  {useLayoutEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../../Shared/Loading/Loading';
import { useParams } from 'react-router-dom';
import people from '../../../Asset/Dummy/activeStatus.json'
import AllCommunityChat from './AllCommunityChat';

const CommunityContainer = () => {
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
        <div >
            <InfiniteScroll
                dataLength={activeMembers.length}
                loader={<Loading></Loading>}
            >
                {
                    activeMembers.length &&
                    activeMembers.map(activeMember => <AllCommunityChat key={activeMember} activeMember={activeMember}></AllCommunityChat>)
                }
            </InfiniteScroll>

        </div>
    );
};

export default CommunityContainer;