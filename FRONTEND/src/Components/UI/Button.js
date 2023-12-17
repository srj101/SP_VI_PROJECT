
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { API_URL } from '../../API/config';
import Loading from '../../Shared/Loading/Loading';

function Button(props) {
    const { userId, professionId, } = props; // professionId is the id of the profession && userId is the id of the user
    const [follow, setFollow] = React.useState(undefined); // follow is the state of the button


    const { data, isLoading, error } = useQuery({ // this is the query to check if the user is following the profession or not
        queryKey: ['follow', professionId],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/v1/profession/isFollowing?professionId=${professionId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json();
            setFollow(data.isFollowing)
            console.log(data)
            return data;
        }
    })

    const [loading, setLoading] = useState(false)

    const handleFollow = async () => {
        setLoading(true)
        // this is the query to follow the profession
        try {
            const res = await fetch(`${API_URL}/api/v1/profession/professionFollow`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        professionId
                    })
                }
            )
            setFollow(true)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }


    }

    const handleUnfollow = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/v1/profession/professionUnfollow/${professionId}`, // this is the query to unfollow the profession
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setFollow(false)
            setLoading(false)




        } catch (error) {
            setLoading(false)
            console.log(error)

        }


    }
    if (isLoading || !data || follow === undefined) {
        return <Loading />
    }

    if (error) {
        console.log(error)
        return null
    }


    return (

        follow === true ?
            <button disabled={loading || isLoading || !data} onClick={handleUnfollow} className="btn btn-primary">{loading ? "wait..." : "Unfollow"}</button>
            :
            <button disabled={loading || isLoading || !data} onClick={handleFollow} className="btn btn-primary" > {loading ? "wait..." : "Follow Now"}</button >

    )
}

export default Button
