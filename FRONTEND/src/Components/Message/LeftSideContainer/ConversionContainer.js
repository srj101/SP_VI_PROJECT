import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import people from '../../../Asset/Dummy/activeStatus.json'
import AllConversion from './AllConversion';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../../Shared/Loading/Loading';

const ConversionContainer = () => {
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
                activeMembers.map(activeMember => <AllConversion key={activeMember} activeMember={activeMember}></AllConversion>)
            }
</InfiniteScroll>

        </div>
    );
};

export default ConversionContainer;