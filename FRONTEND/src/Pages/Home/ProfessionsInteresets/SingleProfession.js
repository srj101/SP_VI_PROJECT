import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../API/config';
import Button from '../../../Components/UI/Button';
import { AuthContext } from '../../../Context/AuthProvider';




const SingleProfession = ({ profession }) => {
    //getting professions from professionsInterests component and destructuring it
    const { id, name, images, users, description } = profession;
    const { user } = useContext(AuthContext) //getting Current user from AuthContext



    return (
        <div>

            <div className="card  bg-base-100 shadow-xl">
                <figure><img className='h-[300px]' src={images[images?.length - 1]} alt="profession" /></figure>

                <div className="card-body">
                    <Link to={`/main/professionchoice/${id}`} >
                        <h2 className="card-title">{name}</h2>
                        <p >{description?.length > 150 ? description.substr(0, 150) + "..." : description}</p>
                    </Link>
                    <div className="card-actions justify-end">
                        <Button userId={user?.id} professionId={id} />
                    </div>
                </div>
            </div>
        </div >

    );
};

export default SingleProfession;