import React, { useEffect, useState } from 'react';
import Filter from '../../Components/Filter/Filter';

import UserCard from '../../Components/userCard/UserCard';
import { useParams } from 'react-router-dom';
// import { sports } from '../../Asset/Dummy/SportsInterestData';
import { API_URL } from '../../API/config';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const ProfessionChoice = () => {
    const params = useParams(); // Getting the id of the community from the url
    const [profession, setProfession] = useState();
    const { data, refetch, isLoading, isError } = useQuery({
        queryKey: ['professionById', params?.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/v1/profession/professions/${params.id}`, { // Getting the Profession by id
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json()
            setProfession(data.profession);
            return data.profession;
        }
    });

    if (isLoading) {
        return <Loading />
    }
    if (!data) {
        return <h1>No Data</h1>
    }
    if (isError) {
        return <h1>Something went wrong</h1>
    }


    return (
        <div>
            <div className='text-3xl font-bold text-center my-16'>{profession?.name} Page</div>
            <Filter />
            <div className='divide-x-2 divide-black-100 divide-dashed' />
            <UserCard />
        </div >


    );
};

export default ProfessionChoice;