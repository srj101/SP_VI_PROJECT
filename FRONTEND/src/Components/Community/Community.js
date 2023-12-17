import { SearchRounded } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import props2 from '../../Asset/Dummy/mycommunity.json';
import Loading from '../../Shared/Loading/Loading';
import MyCommunity from '../../Pages/Community/MyCommunity';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { API_URL } from '../../API/config';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchContext } from '../../Context/SearchContext';



function Community({ userId }) {
    const { communitySearch, setCommunitySearch } = useContext(SearchContext)

    const fetchMyCommunity = async ({ pageParam = 1 }) => {
        const url = `${API_URL}/api/v1/community/communities?page=${pageParam}&limit=${10}&userId=${userId}&search=${communitySearch}`
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await res.json();

        return {
            data: data.communities
        }
    }


    // get my community
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: ['myCommunities', userId, communitySearch],
        queryFn: fetchMyCommunity,
        getNextPageParam: (lastPage, pages) => {
            // console.log("lastPage:", lastPage)
            // console.log("pages:", pages)
            if (lastPage.data.length < 1) {
                return undefined
            }
            return pages.length + 1

        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        return <h1>Error Occurs!</h1>
    }
    if (!data) {
        return <Loading></Loading>
    }



    return (
        <>
            <div className=' bg-white rounded-lg shadow-xl pb-10 '>


                <div className="mt-4 h-0.5 w-full bg-gray-200"></div>
                <div>
                    <h1 className='mt-4 p-2 m-2'>Community </h1>
                </div>
                <div className="text-center text-2xl">
                    {
                        data.pages[0].data.length === 0 && data.pages.length === 1
                        &&
                        <div className='flex justify-center items-center'>
                            <h1 className='text-gray-400'>Empty Community List</h1>
                        </div>
                    }
                </div>


                <div>
                    {/* Show only 10 community each time */}
                    <InfiniteScroll
                        dataLength={data?.pages.length}
                        next={() => fetchNextPage()}
                        hasMore={hasNextPage}
                    >

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-4">

                            {data &&
                                data.pages.map((page, id) => {
                                    return page.data.map((community, id) => {
                                        // Show only 10 community each time
                                        return <MyCommunity community={community.community} key={id} />
                                    })
                                })}



                        </div>
                    </InfiniteScroll>
                </div>






            </div>

        </>
    )
}

export default Community
