import { useQueries, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../API/config.js'
import CommunityDetails from "../../Asset/Dummy/CommunityInfo.js"
import { AuthContext } from '../../Context/AuthProvider.js'
import Loading from '../../Shared/Loading/Loading.js'
import MyCommunitySingle from './MyCommunitySingle/MyCommunitySingle.js'
function CommunityInfo() {
    const params = useParams() // Getting the id of the community from the url
    const navigate = useNavigate(); // Used to redirect to another page
    const { user } = useContext(AuthContext) // Getting the user info from the context
    const [loading, setLoading] = useState(undefined) // Used to show loading
    const [hasAccess, setHasAccess] = useState(false) // Used to check if user has access to the community


    const [IsAreadyMemeber, GetCommunityInfo] = useQueries({ // useQueries is used to fetch multiple queries at once
        queries: [
            {
                queryKey: ['isAreadyMemeberCommunity', params?.id],
                queryFn: async () => {
                    const url = `${API_URL}/api/v1/community/isAlreadyMemeber/${params.id}` // Checking if user is already a member of the community
                    const res = await fetch(url, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `bearer ${localStorage.getItem('token')}`
                        }
                    })
                    const data = await res.json()
                    console.log(data)
                    return {
                        data: data.isMember
                    }
                }
            },
            {
                queryKey: ['getCommunityInfo', params?.id],
                queryFn: async () => {
                    const url = `${API_URL}/api/v1/community/communities/${params.id}` // Getting community info
                    const res = await fetch(url, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await res.json();
                    console.log(data)
                    return {
                        data: data.community
                    }
                }
            }
        ]

    })



    const handleJoin = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/v1/community/joinCommunity/${params.id}`, // Joining the community
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setLoading(false)
            setHasAccess(true)
        }
        catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    // Checking if user is already a member of the community
    useEffect(() => {
        if (IsAreadyMemeber?.data?.data) {
            setHasAccess(true)
        }
    }, [IsAreadyMemeber?.data?.data, hasAccess]);

    if (GetCommunityInfo.isLoading || IsAreadyMemeber.isLoading) {
        return <Loading />
    }


    if (!GetCommunityInfo.data || !IsAreadyMemeber.data) {
        return <h1>Not Found!</h1>
    }

    if (GetCommunityInfo.isError || IsAreadyMemeber.isError) {
        return <h1>Error Occurs!</h1>
    }
    if (hasAccess === true) {
        return <MyCommunitySingle />
    }


    const { name: cName, image: cImage, description: cDescription, members: cMember, owner: cOwner, profession: cProfession } = GetCommunityInfo.data.data // Destructuring the data
    return (
        <>
            {/* Header Section */}

            <div className="h-full bg-gray-300">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="w-full h-[450px] ">
                        <img src={`${API_URL}/${cImage}`} alt="cover" className="w-full h-full rounded-tl-lg rounded-tr-lg  object-cover object-center" />
                    </div>
                    <div className='flex items-center justify-between p-3 mx-5'>
                        <div className='text-xl text-gray-900 font-bold '>{cName}</div>

                        <button disabled={loading} onClick={handleJoin} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                            </svg>
                            <span>{loading ? "Joining" : "Join"}</span>
                        </button>
                    </div>
                </div>
                {/* Info Section */}
                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Community Info</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">Name :</span>
                                    <span className="text-gray-700">{cName}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Members :</span>
                                    <span className="text-gray-700">{cMember.length}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Created By :</span>
                                    <span className="text-gray-700">{cOwner.firstName} {cOwner.lastName}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Professions : </span>
                                    <span className="text-gray-700">{cProfession.name}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Description Section */}
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Description</h4>
                            <p className="mt-2 text-gray-700">{cDescription}</p>
                        </div>


                    </div>
                </div>
                {/* Connection Section */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl text-gray-900 font-bold">Connections ({cMember.length})</h4>
                    </div>
                    <div className="flex mb-5 -space-x-4">
                        {
                            cMember.map((member, key) => (

                                <Link to={`/main/profileUser/${member.user.id === user.id ? "" : member.user.id}`} className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
                                    <img src={`${API_URL}/${member.user.profilePicture}`} alt='member' className="w-16 h-16 rounded-full" />
                                </Link>
                            )
                            )
                        }
                    </div>
                </div>
            </div>








        </>
    )
}

export default CommunityInfo