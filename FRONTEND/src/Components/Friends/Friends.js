
import { SettingFilled, UserAddOutlined } from '@ant-design/icons';
import { CalendarMonth, PinDrop, Place, Recommend, SearchRounded } from '@mui/icons-material';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import React, { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../API/config';


import { AuthContext } from '../../Context/AuthProvider';
import { SearchContext } from '../../Context/SearchContext';
import Loading from '../../Shared/Loading/Loading';
import { getAge } from '../../Shared/Utitily/Utility';

const FriendItem = ({ item }) => {
    const params = useParams(); // get params from url
    const { user } = useContext(AuthContext) // get user from context
    const { id, firstName, lastName, location, coverPicture, profilePicture, professions, dob } = item.friend // get friend from item and distructured

    return (
        <Link to={`/main/profileUser/${id !== user.id ? id : ""} `}>
            <div className="flex flex-row shadow-lg rounded-lg border border-gray-200/80 bg-white mx-2 my-4">
                <div className="relative">
                    <img className="w-40 h-40 rounded-md object-contain" src={`${API_URL}/${profilePicture}`}
                        alt="User" />
                    {/* Active Icon */}
                </div>

                <div className="flex flex-col px-6 mt-5 ">
                    <div className="flex h-8 flex-row">
                        <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
                    </div>

                    <div className="my-2 flex flex-row space-x-8">

                        <div className="flex flex-row">
                            <Recommend fontSize='small' />

                            <div className="text-xs text-gray-400/80 hover:text-gray-400">{professions?.length === 0 ? "No Interest" : professions[0]?.profession?.name}</div>

                        </div>


                        <div className="flex flex-row">
                            <CalendarMonth fontSize='small' />

                            <div className="text-xs text-gray-400/80 hover:text-gray-400"> {getAge(dob)} Years</div>
                        </div>
                    </div>



                </div>
            </div>

        </Link>
    )
}

function Friends({ userId }) {
    const { friendsSearch, setFriendsSearch } = useContext(SearchContext)
    const fetchFriends = async ({ pageParam = 1 }) => {
        const url = `${API_URL}/api/v1/user/friendslist?page=${pageParam}&limit=${10}&userId=${userId}&friendsSearch=${friendsSearch}`
        console.log("url:", url)
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await res.json();
        return {
            data: data.friends
        }

    }


    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: ['myfriendList', userId, friendsSearch],
        queryFn: fetchFriends,
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
        return <div>Something went wrong</div>
    }
    if (!data) {
        return <Loading></Loading>
    }




    return (


        <>
            <div className='bg-white rounded-lg shadow-xl pb-10 '>
                <div>
                    <h1 className='mt-4 p-2 m-2'>Friends </h1>
                </div>

                {

                    data.pages[0].data.length === 0 && data.pages.length === 1
                    &&
                    <div className='flex justify-center items-center'>
                        <h1 className='text-gray-400'>No Friends</h1>
                    </div>


                }

                <div>

                    <InfiniteScroll
                        dataLength={data?.pages?.length}
                        next={() => fetchNextPage()}
                        hasMore={hasNextPage}


                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                            {
                                data &&
                                data?.pages?.map((page, id) => {
                                    return page?.data?.map((item, id) => {
                                        return <FriendItem item={item} key={id} />
                                    })
                                }
                                )

                            }

                        </div>
                    </InfiniteScroll>
                </div>

            </div>
        </>
    )
}

export default Friends