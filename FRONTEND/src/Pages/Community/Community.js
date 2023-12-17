import React, { useContext, useLayoutEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import "./Community.css";
import props from "../../Asset/Dummy/suggestedcommunity.json";
import props2 from "../../Asset/Dummy/mycommunity.json";
import SuggestedCommunities from "./SuggestedCommunities";
import { FaPlusCircle } from "react-icons/fa";
import MyCommunity from "./MyCommunity";
import { API_URL } from "../../API/config";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthContext } from "../../Context/AuthProvider";
import { SearchContext } from "../../Context/SearchContext";
import SuggestedCommunitySearch from "../../Components/Community/SuggestedCommunitySearch";
import gravatarUrl from "gravatar-url";

const SuggestedCommunity = () => {
  const { user } = useContext(AuthContext);
  const { suggestCommunitySearch } = useContext(SearchContext);

  const fetchAllCommunity = async ({ pageParam = 1 }) => {
    const url = `${API_URL}/api/v1/community/communitiesList?page=${pageParam}&limit=${10}&suggestCommunitySearch=${suggestCommunitySearch}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    //console.log("ALLCOMMUNITY:", data)
    return {
      data: data.communities,
    };
  };

  const AllCommunity = useInfiniteQuery({
    queryKey: ["allCommunityList", user?.id, suggestCommunitySearch],
    queryFn: fetchAllCommunity,
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage:", lastPage)
      // console.log("pages:", pages)
      if (lastPage?.data?.length < 1) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  // console.log(MyOwnedCommunity.data)
  // console.log(AllCommunity.data)
  if (AllCommunity.isLoading) {
    return <Loading />;
  }
  if (AllCommunity.isError) {
    return <div>Error</div>;
  }

  if (!AllCommunity.data) {
    return <Loading />;
  }

  return (
    <div className="overflow-y-scroll h-screen" id="scrollableDiv1">
      <InfiniteScroll
        dataLength={AllCommunity?.data?.pages?.length}
        next={() => AllCommunity?.fetchNextPage()}
        hasMore={AllCommunity?.hasNextPage}
        scrollableTarget="scrollableDiv1"
      >
        <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-6 my-5 pb-48">
          {AllCommunity?.data &&
            AllCommunity?.data?.pages?.map((page, id) => {
              return page?.data?.map((community, id) => {
                if (community?.isMember === false) {
                  return (
                    <SuggestedCommunities community={community} key={id} />
                  );
                }
              });
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const MyCommunitySidebar = () => {
  const { user } = useContext(AuthContext); // getting user from context
  const fetchMyCommunity = async ({ pageParam = 1 }) => {
    const url = `${API_URL}/api/v1/community/myCommunities?page=${pageParam}&limit=${10}&userId=${user.id
      }`;
    const res = await fetch(url, {
      //getting my community which is the owned by mee at max 10 at a time
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    return {
      data: data.communities,
    };
  };
  const MyOwnedCommunity = useInfiniteQuery({
    //using infinite query to get all my community

    queryKey: ["myOwnedCommunities", user?.id],
    queryFn: fetchMyCommunity,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < 10) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  if (MyOwnedCommunity.isLoading) {
    return <Loading></Loading>;
  }
  if (MyOwnedCommunity.isError) {
    return <h1>Error Occurs!</h1>;
  }
  if (!MyOwnedCommunity.data) {
    return <h1>Empty</h1>;
  }

  return (
    <div className="bg-slate-200 shadow-lg hidden lg:block p-6  fixed  w-[400px]">
      <div className="flex items-center mb-6">
        <div className="w-14 mr-2">
          {user.profilePicture ? (
            <img
              src={`${API_URL}/${user?.profilePicture}`}
              alt="User"
              className="rounded-full w-12 h-12 shadow-md"
            />
          ) : (
            <img
              src={gravatarUrl(user.email, { size: 200 })}
              alt="User"
              className="rounded-full w-12 h-12 shadow-md"
            />
          )}
        </div>
        <div>
          <Link to="/main/profileUser">
            <h3 className="text-3xl">
              {user?.firstName} {user?.lastName}
            </h3>
          </Link>
        </div>
      </div>
      <Link to="/main/createcommunity" className="m-2 flex items-center mb-10">
        <div className="w-7 mr-4">
          <FaPlusCircle className="text-3xl w-7 text-blue-600"></FaPlusCircle>
        </div>
        <div>
          <h3 className="text-xl text-blue-600">Create your own community</h3>
        </div>
      </Link>
      <div>
        <div>
          <h1 className="text-lg text-slate-500 text-left">My Community</h1>
          <hr className="h-[4px] bg-slate-300 shadow-lg"></hr>
        </div>

        <div className="overflow-y-scroll h-screen  " id="scrollableDiv">
          <InfiniteScroll
            dataLength={MyOwnedCommunity?.data?.pages?.length}
            next={() => MyOwnedCommunity?.fetchNextPage()}
            hasMore={MyOwnedCommunity?.hasNextPage}
            scrollableTarget="scrollableDiv"
          >
            <div className=" mb-20 pb-48">
              {MyOwnedCommunity?.data &&
                MyOwnedCommunity?.data?.pages?.map((page, id) => {
                  return page?.data?.map((community, id) => {
                    return <MyCommunity community={community} key={id} />;
                  });
                })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  // const { data: communities = [], refetch, isLoading } = useQuery({
  //     queryKey: ['communities'],
  //     queryFn: async () => {
  //         console.log('ehg')
  //         const res = await fetch('suggestedcommunity.json');
  //         const data = await res.json();
  //         console.log(data);
  //         return data
  //     }
  // });

  return (
    <>
      <MyCommunitySidebar />
      <div className="flex justify-center  ml-0 lg:ml-[300px] bg-slate-300 ">
        <div className="w-4/5">
          <SuggestedCommunitySearch />
          <SuggestedCommunity />
        </div>
      </div>
    </>
  );
};

export default Community;
