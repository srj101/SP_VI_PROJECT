import React from "react";
import ProfessionSearch from "../ProfessionSearch/ProfessionSearch";
import ProfessionInterests from "../ProfessionsInteresets/ProfessionInterests";
// import "./Home.css";
// import { API_URL } from "../../../API/config";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
const Home = () => {
  // const [professions, setProfessions] = useState([]);
  // const { data, refetch, isLoading, isError } = useQuery({
  //   queryKey: ['professions'],
  //   queryFn: async () => {
  //     const res = await fetch(`${API_URL}/api/v1/profession/professions?skip=0&take=20`, {
  //       headers: {
  //         method: 'GET',
  //         authorization: `bearer ${localStorage.getItem('token')}`
  //       }
  //     });
  //     const data = await res.json();
  //     console.log(data)
  //     setProfessions(data.professions);
  //     return data.professions;
  //   }
  // });

  // if (isLoading) return <div>Loading...</div>

  // if (isError) return <div>Error</div>

  return (
    <div className="fixed w-full ">
      <ProfessionSearch></ProfessionSearch>
      <ProfessionInterests />
    </div>
  );
};

export default Home;
