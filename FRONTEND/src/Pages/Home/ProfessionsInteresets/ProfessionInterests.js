import React, { useContext } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProfession from "./SingleProfession";
import { API_URL } from "../../../API/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchContext } from "../../../Context/SearchContext";
const ProfessionInterests = () => {
  const { search } = useContext(SearchContext);

  const fetchProfessions = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${API_URL}/api/v1/profession/professions?page=${pageParam}&limit=${10}&searchQuery=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    return {
      data: data.professions,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    // gettting professions at max 10 per page
    queryKey: ["professions", search],
    queryFn: fetchProfessions,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < 1) {
        return undefined;
      }
      return pages?.length + 1;
    },
  });

  if (!data || isLoading) {
    return <Loading />;
  }
  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  if (data?.pages[0]?.data?.length === 0 && data?.pages?.length == 1) {
    return <p className="text-center">No Profession Found!!</p>;
  }

  return (
    <div
      className="h-screen w-full overflow-auto lg:overflow-hidden lg:hover:overflow-auto"
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={data?.pages?.length}
        next={() => fetchNextPage()}
        scrollableTarget="scrollableDiv"
        hasMore={hasNextPage}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-48 lg:mb-56 mt-16 mx-0 lg:mx-28">
          {data &&
            data?.pages?.map((page, i) => (
              <React.Fragment key={i}>
                {page?.data?.map((profession) => (
                  <SingleProfession profession={profession} key={profession.id} />
                ))}
              </React.Fragment>
            ))}
        </div>
      </InfiniteScroll>
    </div>

    // <>
    //   <button
    //     onClick={() => fetchNextPage()}
    //     id="scrollableDiv"
    //     disabled={!hasNextPage || isFetchingNextPage}
    //   >
    //     {isFetchingNextPage
    //       ? 'Loading more...'
    //       : hasNextPage
    //         ? 'Load More'
    //         : 'Nothing more to load'}
    //   </button>
    //   <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    //   <div className="h-screen w-full overflow-auto lg:overflow-hidden lg:hover:overflow-auto" id="scrollableDiv">

    //     <div className="h-screen w-full overflow-auto lg:overflow-hidden lg:hover:overflow-auto" id="scrollableDiv">

    //       {/* className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-48 lg:mb-56 mt-16 mx-0 lg:mx-28" */}
    //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-48 lg:mb-56 mt-16 mx-0 lg:mx-28">
    //         {
    //           data &&
    //           data.pages.map((page, i) => (
    //             <React.Fragment key={i}>
    //               {page.data.map((profession) => (
    //                 <SingleProfession key={profession.id} profession={profession}></SingleProfession>
    //               ))}
    //             </React.Fragment>
    //           ))}
    //       </div>
    //     </div>

    //   </div>

    // </>
  );
};

export default ProfessionInterests;
