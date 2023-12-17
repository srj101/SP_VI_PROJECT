import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { current } from "daisyui/src/colors";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../API/config";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import InfoEdit from "../../Shared/Modals/InfoEdit";

import { getAge } from "../../Shared/Utitily/Utility";

function About({ user }) {
    const { id, firstName, lastName, profilePicture, gender, dob, location } = user;
    const [edit, setEdit] = React.useState(false);
    const { user: CurrentUser } = useContext(AuthContext)
    // console.log(user)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["findProfessionInterestUser", id],
        queryFn: async () => {
            const url = `${API_URL}/api/v1/profession/professions/interest/${id}`
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            return {
                data: data.interest
            }
        }

    })

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <h1>Something went Wrong!</h1>
    }
    if (!data) {
        return <h1>Empty</h1>
    }

    return (

        <>
            {
                CurrentUser.id !== id ?
                    <div className=' bg-white rounded-lg shadow-xl  '>

                        <div className='flex justify-center items-center'>
                            <ul className=' mt-2 text-gray-700 '>
                                <li className='flex   py-2'>
                                    <span className='font-bold w-24'>Name :</span>
                                    <span className='text-gray-700'>
                                        {firstName} {lastName}
                                    </span>
                                </li>
                                <li className='flex py-2'>
                                    <span className='font-bold w-24'>Interested :</span>
                                    <span className='text-gray-700'>{data?.data?.length !== 0 ? data?.data[0]?.profession?.name : <Link to='/main'>Professions Interest has not set </Link>} {data.data.length > 1 ? `and ${data.data.length - 1} others` : ""} </span>
                                </li>
                                <li className='flex py-2'>
                                    <span className='font-bold w-24'>Age :</span>
                                    <span className='text-gray-700'>{getAge(dob)} years </span>
                                </li>
                                <li className='flex py-2'>
                                    <span className='font-bold w-24'>Location :</span>
                                    <span className='text-gray-700'> {location === null ? "Location hasn't set yet" : location} </span>
                                </li>
                                <li className='flex  py-2'>
                                    <span className='font-bold w-24'>Gender : </span>
                                    <span className='text-gray-700'>{gender ? gender : "Gender hasn't set"}</span>
                                </li>
                            </ul>
                        </div>
                    </div> :
                    <div className=' bg-white rounded-lg shadow-xl  '>
                        <div className='text-center'>
                            <h1 className='text-2xl my-2 border-b-2'>Personal Info </h1>
                        </div>

                        <div className='flex justify-center items-center'>
                            <ul className=' mt-2 text-gray-700 '>
                                <li className='flex   py-2'>
                                    <span className='font-bold w-24'>Name :</span>
                                    <span className='text-gray-700'>
                                        {firstName} {lastName}
                                    </span>
                                </li>
                                <li className='flex py-2'>
                                    <span className='font-bold w-24'>Interested :</span>
                                    <span className='text-gray-700'>{data?.data?.length !== 0 ? data?.data[0]?.profession?.name : <Link to='/main'>Professions Interest has not set </Link>} {data.data.length > 1 ? `and ${data.data.length - 1} others` : ""} </span>
                                </li>
                                <li className='flex py-2'>
                                    <span className='font-bold w-24'>Age :</span>
                                    <span className='text-gray-700'>{getAge(CurrentUser.dob)} years </span>
                                </li>
                                <li className='flex py-2'>
                                    <span className='font-bold w-24'>Location :</span>
                                    <span className='text-gray-700'> {CurrentUser?.location === null ? "Location hasn't set yet" : CurrentUser.location} </span>
                                </li>
                                <li className='flex  py-2'>
                                    <span className='font-bold w-24'>Gender : </span>
                                    <span className='text-gray-700'>{gender ? gender : "Gender hasn't set"}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

            }
        </>




    );
}

export default About;
