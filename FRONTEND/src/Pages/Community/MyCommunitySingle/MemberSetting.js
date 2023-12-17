import React, { useContext, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiUserRemove } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import { API_URL } from '../../../API/config';
import { useAlert } from 'react-alert';
const MemberSetting = ({ member }) => {
    const { user } = member
    const alert = useAlert()
    const [loading, setLoading] = useState(false)
    const { user: currentUser } = useContext(AuthContext);
    const params = useParams()

    const [isMember, setIsMember] = useState(false)
    const handleMember = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/api/v1/community/deleteMember?id=${params.id}&memberId=${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
            const data = await response.json()
            console.log(data)
            if (data.status === 'success') {
                setLoading(false)
                toast.success('Member removed successfully')
            }


        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message)
        }

    }
    return (
        <>
            {
                currentUser.id !== user.id &&
                <div className={`flex justify-between ${isMember ? 'hidden' : 'block'}`}>
                    <div className='flex'>
                        <div className="avatar mr-3">
                            <div className="w-16 rounded">
                                <img src={`${API_URL}/${user.profilePicture}`}
                                    alt="member" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className='mx-0 mr-1 text-lg font-bold'>{user.firstName}</span>
                                <span className='mx-0 text-lg font-bold'>{user.lastName}</span>
                            </div>
                            <div>
                                <span className='mx-0 text-sm'>{user?.professions[0]?.profession?.name}</span>
                            </div>
                        </div>
                    </div>
                    <div >
                        <button className="btn btn-ghost btn-circle h-0">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <BsThreeDotsVertical></BsThreeDotsVertical>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link onClick={handleMember} className="flex items-center">

                                            <p><HiUserRemove className='text-lg'></HiUserRemove></p>
                                            <p>Remove</p>

                                        </Link>


                                    </li>
                                    <li  ><Link to={`/main/profileUser/${currentUser.id === user.id ? "" : user.id}`}>
                                        <p><CgProfile className='text-lg'></CgProfile></p>
                                        <p>View Profile</p>

                                    </Link></li>

                                </ul>

                            </div>
                        </button>


                    </div>
                    <Toaster />
                </div>
            }</>

    );
};

export default MemberSetting;