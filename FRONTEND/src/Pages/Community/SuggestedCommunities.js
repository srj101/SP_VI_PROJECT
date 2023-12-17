import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../API/config';
import Loading from '../../Shared/Loading/Loading';

const SuggestedCommunities = ({ community }) => {

    const { name, image, professionId, id, description } = community; // distructuring the community object from Community.js From Page "../Community/Community.js"
    const [loading, setLoading] = React.useState(undefined)
    console.log(community)
    const navigate = useNavigate() // Used to redirect to another page
    const handleJoin = async () => { // Used to join the community
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/v1/community/joinCommunity/${id}`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setLoading(false)
            navigate(`/main/community/${id}`, { replace: true }) // Redirecting to the community page
        }
        catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const { data, refetch, isLoading, isError } = useQuery({ // Used to fetch the profession name of the community
        queryKey: ['community', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/v1/profession/professions/${professionId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            console.log(data)
            return data.profession;
        }
    });

    if (isLoading || !data) {
        return <Loading />
    }
    if (isError) {
        return <h1>Something went wrong!</h1>
    }

    return (
        <div className="card bg-base-100 shadow-x">
            <figure><img src={`${API_URL}/${image}`} alt="community" /></figure>
            <div className="card-body">
                <Link to={`/main/community/${id}`} >
                    <h2 className="card-title">{name}</h2>
                    <p className='text-xs'>Category: {data.name}</p>
                    <p>{description.length > 20 ? description.substring(0, 80) + "...." : description}</p>
                </Link>
                <div className="card-actions justify-end">
                    <button disabled={loading} onClick={handleJoin} className="btn btn-primary">{loading ? "Joining..." : "Join"} </button>
                </div>
            </div>
        </div>

    );
};

export default SuggestedCommunities;