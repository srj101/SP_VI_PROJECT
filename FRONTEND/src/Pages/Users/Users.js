import React from 'react';
import About from '../../Components/About/About';
import Friends from '../../Components/Friends/Friends';
import Community from '../../Components/Community/Community';
import { Inbox, PersonRemove, Send } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { useContext } from 'react';
import { API_URL } from '../../API/config';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { Cancel } from '@material-ui/icons';
import { BsPersonCheckFill } from 'react-icons/bs';
import { SearchContext } from '../../Context/SearchContext';


const Users = () => {
    const params = useParams(); // Get the id from the url
    const [friend, setFriend] = React.useState(undefined); // Check if the user is friend or not
    const [isFriendReceived, setIsFriendReceived] = React.useState(undefined); // Check if the user has sent friend request or not
    const [loading, setLoading] = React.useState(false);
    const [wait, setWait] = React.useState(undefined); // Check if the user has sent friend request or not
    const { user } = useContext(AuthContext) // Get the user
    const { setCommunitySearch, communitySearch, friendsSearch, setFriendsSearch } = useContext(SearchContext)

    const { data, isLoading, error } = useQuery({ // Get the a user by id
        queryKey: ['findAUser', params?.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/v1/user/finduser/${params.id}`, { // 
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })



    const handleCanelFriendRequest = async () => { // Cancel the friend request
        setLoading(true)
        try {
            const url = `${API_URL}/api/v1/user/cancelFriendRequest/${params.id}`
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            setFriend(false)
            setWait(false)
            setIsFriendReceived(false)
            setLoading(false)



        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }

    }



    const handleSendFriendRequest = async () => { // Send the friend request
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/v1/user/sendFriendRequest/${params.id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            console.log(data)
            setFriend(false)
            setIsFriendReceived(false)
            setWait(true)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    const handleUnfriend = async () => { // Unfriend the user
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/v1/user/deleteFriend/${params.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            console.log(data)
            setFriend(false)
            setWait(false)
            setIsFriendReceived(false)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    const handleAcceptFriendRequest = async () => { // Accept the friend request
        setLoading(true)
        try {
            const url = `${API_URL}/api/v1/user/acceptFriendRequest/${params.id}`
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();

            setWait(false)
            setIsFriendReceived(false)
            setFriend(true)
            setLoading(false)

        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    // Check if the user is a friend
    const IsFriend = useQuery({
        queryKey: ['findFriend', params?.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/v1/user/isFriend/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            setFriend(data.isFriend)
            return data;
        }
    })

    const IsFriendReqReceived = useQuery({ // Check if the user has received request or not
        queryKey: ['findFriendReqReceived', params?.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/v1/user/isFriendReqReceived/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            setIsFriendReceived(data.isFriendReqReceived)
            return data;
        }

    })


    const IsFriendReqSend = useQuery({ // Check if the user has sent friend request or not
        queryKey: ['findFriendReqSend', params?.id],
        queryFn: async () => {

            const res = await fetch(`${API_URL}/api/v1/user/isFriendReqSent/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            setWait(data.isFriendReqSent)
            return data;
        }
    }

    )

    if (!data || !IsFriend.data || !IsFriendReqReceived.data || !data.user || !IsFriendReqSend.data) {
        return <Loading />
    }
    if (isLoading || IsFriend.isLoading || IsFriendReqReceived.isLoading || IsFriendReqSend.isLoading) {
        return <Loading />
    }
    if (error || IsFriend.error || IsFriendReqReceived.error || IsFriendReqSend.error) {
        return <div>Something went wrong</div>
    }

    return (
        <>
            <div className="h-full   lg:px-20">
                <div className="bg-white  mb-20">
                    <div className="w-full h-[250px] relative">
                        <img src={`${API_URL}/${data.user?.coverPicture}`} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover" />
                    </div>


                    <div className="flex flex-col items-center -mt-20 relative z-30 h-40">
                        <div class="img-container ">
                            <div class="avatar-upload">
                                <div class="avatar-preview">

                                    <img
                                        id="imagePreview"
                                        className="h-full rounded-full w-full object-cover"
                                        src={`${API_URL}/${data.user.profilePicture}`}
                                    ></img>

                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-2xl">
                                {data.user.firstName} {data.user.lastName}
                            </p>
                        </div>
                    </div>
                    <div className='mt-20'>
                        {
                            friend ?
                                <div className="flex  items-center lg:items-center justify-center px-8 mt-5">

                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="flex items-center space-x-4 mt-2">
                                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                                <Send />
                                                <button>Message</button>
                                            </button>
                                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                                <PersonRemove />
                                                <button disabled={loading} onClick={handleUnfriend}>{loading ? "Unfriending..." : "Unfriend"}</button>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                :

                                wait ?
                                    <div className="flex flex-col items-center lg:items-center justify-center px-8 mt-5">
                                        <div className="flex items-center space-x-4 mt-2">
                                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                                <Cancel />
                                                <button disabled={loading} onClick={handleCanelFriendRequest}>{loading ? "Canceling" : "Cancel"} </button>
                                            </button>
                                        </div>
                                    </div> :

                                    isFriendReceived ?
                                        <div className="flex flex-col items-center lg:items-center justify-center px-8 mt-5">
                                            <div className="flex items-center space-x-4 mt-2">
                                                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                                    <BsPersonCheckFill />
                                                    <button disabled={loading} onClick={handleAcceptFriendRequest}>{loading ? "Accepting" : "Accept"}</button>
                                                </button>
                                            </div>
                                        </div> :
                                        <div className="flex flex-col items-center lg:items-center justify-center px-8 mt-5">
                                            <div className="flex items-center space-x-4 mt-2">
                                                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                                    </svg>
                                                    <button disabled={loading} onClick={handleSendFriendRequest}>{loading ? "Connecting" : "Connect"}</button>
                                                </button>
                                            </div>
                                        </div>


                        }
                    </div>
                </div>
                {/* Connections */}


                <ul className="bg-white  nav nav-tabs flex justify-center items-center  md:flex-row flex-wrap list-none border-b-0  pl-0  text-xl" id="tabs-tab"
                    role="tablist">
                    <li className="nav-item" role="presentation">
                        <a href="#tabs-home" className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
                            aria-selected="true">About</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a href="#tabs-home" className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
                            aria-controls="tabs-profile" aria-selected="false">Friends</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a href="#tabs-messages" className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-messages-tab" data-bs-toggle="pill" data-bs-target="#tabs-messages" role="tab"
                            aria-controls="tabs-messages" aria-selected="false">Community</a>
                    </li>

                </ul>
                < div className="tab-content" id="tabs-tabContent">
                    <div className="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
                        <About user={data.user} />
                    </div>
                    <div className="tab-pane fade " id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
                        <div className='flex justify-center items-center px-6'>
                            <div className="pt-2 relative mx-auto text-gray-600">
                                <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                    type="search" name="search" placeholder="Search"
                                    value={friendsSearch}
                                    onChange={(e) => setFriendsSearch(e.target.value)}

                                />

                            </div>

                        </div>
                        <Friends userId={data.user.id} />
                    </div>
                    <div className="tab-pane fade" id="tabs-messages" role="tabpanel" aria-labelledby="tabs-profile-tab">
                        <div className='bg-white  flex justify-center items-center px-6'>
                            <div className="p-2 relative mx-auto text-gray-600">
                                <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                    type="text" name="search" placeholder="Search"
                                    value={communitySearch}
                                    onChange={(e) => {
                                        setCommunitySearch(e.target.value);
                                    }}
                                />
                            </div>

                        </div>
                        <Community userId={data.user.id} />
                    </div>

                </div>





            </div>
        </>
    );
};

export default Users;