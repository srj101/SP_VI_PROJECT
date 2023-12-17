import { Add } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CreateCommunityFriendList from "../../Components/Friends/CreateCommunityFriendList";
import { useNavigate, useParams } from "react-router-dom";
import friendProps from "../../Asset/Dummy/user.json";
import Loading from "../../Shared/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../../API/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useAlert } from "react-alert";
import { useQueryClient } from "@tanstack/react-query";

function CreateCommunity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // initialise the hook
  const [uploadImage, setUploadImage] = useState(null); // image upload
  const [imgFile, setImageFile] = useState(null); // image upload
  const [friends, setFriends] = useState([]); // friends list
  const friendParams = useParams(); // friends list
  const [countFriends, setCountFriends] = useState(0); // count friends which is selected to add in community
  const [addedFriendData, setAddedFriendData] = useState([]); // added friends data which is selected to add in community
  const [isTrue, setIsTrue] = useState(true); // button disable
  const [data1, setData1] = useState({});
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(""); // select professions
  const [professions, setProfessions] = useState([]); // professions list
  const { user } = useContext(AuthContext); // current user
  const alert = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (addedFriendData.length >= 3) {
      if (name !== "" && des.length >= 20 && select !== "") {
        setIsTrue(false);
      }
    }
  }, [addedFriendData, name, des, select]);

  useEffect(() => {
    if (name === "" || des.length < 20 || select === "") {
      setIsTrue(true);
    }
  }, [name, des, select]);

  const comName = (e) => {
    setName(e.target.value);
  };
  const comDes = (e) => {
    setDes(e.target.value);
  };

  const professionSelect = (e) => {
    setSelect(e.target.value);
  };

  const fetchFriends = async ({ pageParam = 1 }) => {
    // fetch friends list
    const url = `${API_URL}/api/v1/user/friendslist?page=${pageParam}&limit=${10}&userId=${
      user.id
    }`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    
    const data = await res.json();

    return {
      data: data.friends,
    };
  };

  const AddToFriend = useInfiniteQuery({
    // fetch friends list
    queryKey: ["myfriendList", user?.id],
    queryFn: fetchFriends,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < 1) {
        return undefined;
      }
      return pages?.length + 1;
    },
  });

  const getProfessions = async () => {
    // fetch es list
    const res = await fetch(`${API_URL}/api/v1/profession/professions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await res.json();

    setProfessions(data.professions);
    return data;
  };

  useEffect(() => {
    getProfessions();
  }, []);

  const previewImage = (event) => {
    // Preview image before upload
    const imageFiles = event.target.files;
    const fileSize = event.target.files[0].size / 1024 / 1024;
    const fileType = event.target.files[0].type;
    console.log(fileType);
    if (fileSize > 2) {
      setUploadImage(null);
      toast.success("File size greater than 2mb", {
        style: {
          border: "1px solid blue",
          padding: "16px",
          color: "black",
        },
        iconTheme: {
          primary: "blue",
          secondary: "yellow",
        },
      });
      return;
    }

    if (
      // check file type
      fileType !== "image/jpeg" &&
      fileType !== "image/jpg" &&
      fileType !== "image/png"
    ) {
      // if file type is not jpg, jpeg or png then set UploadImage to null
      setUploadImage(null);
      toast.success("File type must be jpg, jpeg or png", {
        style: {
          border: "1px solid blue",
          padding: "16px",
          color: "black",
        },
        iconTheme: {
          primary: "blue",
          secondary: "yellow",
        },
      });
      return;
    }
    setImageFile(imageFiles[0]); // else set imageFile to imageFiles[0]
    const imageFilesLength = imageFiles.length; // set imageFilesLength to imageFiles.length
    if (imageFilesLength > 0) {
      // if imageFilesLength is greater than 0 then set UploadImage to URL.createObjectURL(imageFiles[0])
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      setUploadImage(imageSrc);
    }
  };
  const handleCommunity = async (data) => {
    // create community function
    setLoading(true);
    const members = addedFriendData.map((item) => item.id);
    if (members.length < 3) {
      alert.error('Please add at least 3 friends');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    if (imgFile) {
      formData.append('image', imgFile);
    }
    formData.append('name', data.communityName);
    formData.append('description', data.description);
    formData.append('professionId', data.professionSelect);
    formData.append('members', JSON.stringify(members));
    try {
      const data = fetch(`${API_URL}/api/v1/community/createCommunity`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
      });
      // const res = await data.json();
      // console.log(res);
      alert.success('Community Created Successfully');
      setLoading(false);
      queryClient.invalidateQueries('myOwnedCommunities');
      navigate('/main/community');
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert.error('Something went wrong');
    }
  }
  if (!AddToFriend.data) {
    return <Loading />;
  }
  if (AddToFriend.isLoading) {
    return <Loading />;
  }
  if (AddToFriend.isError) {
    return <h1>Something went Wrong!</h1>;
  }

  return (
    <>
      <div className="my-16">
        <div className="text-lg lg:text-2xl text-center mt-20 font-bold">
          Create your Community
        </div>
        <form onSubmit={handleSubmit(handleCommunity)}>
          <input
            type="text"
            {...register("communityRule", {
              required: "Community description is required",
            })}
            defaultValue="Rule"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs hidden"
          />
          <div className="shadow  overflow-y-auto sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 items-center">
                <div className="form-floating mb-3 ">
                  <input
                    type="text"
                    {...register("communityName", {
                      required: "Community description is required",
                    })}
                    onChange={comName}
                    className="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput" className="text-gray-700">
                    Community Name*
                  </label>
                  {errors.communityName && (
                    <p className="text-red-500">Community name is required</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Give a name to your community which is required.
                  </p>
                </div>
                <div className="mt-[-20px]">
                  <select
                    className="select select-bordered w-full px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    {...register("professionSelect", {
                      required: true,
                    })}
                    onChange={professionSelect}
                    disabled={professions.length === 0}
                  >
                    <option disabled defaultValue={""}>
                      Community category
                    </option>

                    {professions.length &&
                      professions.map((profession) => (
                        <option value={profession.id}>{profession.name}</option>
                      ))}
                  </select>
                  {errors.professionSelect && (
                    <p className="text-red-500">
                      Community category is required
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Select Profession's category and it is required
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 items-center ">
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-3"
                  >
                    Description*
                  </label>
                  <div className="">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Community description is required",
                      })}
                      onChange={comDes}
                      rows="14"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
                      placeholder=""
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500">
                        Write at least 20 characters
                      </p>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your community is required*.
                  </p>
                </div>

                {/* FrindList */}

                <div className="mt-8">
                  <div className="flex flex-col justify-center text-gray-600">
                    <div className="w-full  mx-auto bg-white rounded-md border border-gray-200">
                      <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">
                          Add Friend
                        </h2>
                      </header>
                      <div className="p-4">
                        <div
                          className=" h-[210px] overflow-hidden hover:overflow-y-scroll"
                          id="scrollableDiv"
                        >
                          <InfiniteScroll
                            dataLength={AddToFriend.data?.pages.length}
                            next={() => AddToFriend.fetchNextPage()}
                            hasMore={AddToFriend.hasNextPage}
                            scrollableTarget="scrollableDiv"
                          >
                            <table className="table-auto w-full">
                              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                  <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">
                                      Name
                                    </div>
                                  </th>

                                  <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">
                                      Interested
                                    </div>
                                  </th>
                                  <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">
                                      Status
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-sm divide-y divide-gray-100">
                                {AddToFriend?.data &&
                                  AddToFriend?.data?.pages?.map((page) =>
                                    page?.data?.map((friend) => (
                                      <CreateCommunityFriendList
                                        key={friend.id}
                                        friend={friend}
                                        addedFriendData={addedFriendData}
                                        setAddedFriendData={setAddedFriendData}
                                        countFriends={countFriends}
                                        setCountFriends={setCountFriends}
                                      ></CreateCommunityFriendList>
                                    ))
                                  )}
                              </tbody>
                            </table>
                          </InfiniteScroll>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`mt-2 text-sm text-gray-500 ${
                      countFriends === 0 ? "block" : "hidden"
                    }`}
                  >
                    Add at least three of your friends
                  </p>

                  <p
                    className={`mt-2 text-sm text-gray-500 ${
                      countFriends === 1 ? "block" : "hidden"
                    }`}
                  >
                    You have added {countFriends} friend
                  </p>

                  <p
                    className={`mt-2 text-sm text-gray-500 ${
                      countFriends > 1 ? "block" : "hidden"
                    }`}
                  >
                    You have added {countFriends} friends
                  </p>
                </div>
              </div>

              <div>
                <div className="">
                  <h1 className="my-3">Set a group banner</h1>
                  <div className="image-preview-container">
                    <div className="preview">
                      <img
                        src={uploadImage}
                        alt="upload"
                        className={`${uploadImage ? "block" : "hidden"}`}
                        id="preview-selected-image"
                      />
                    </div>
                    <label>
                      Upload Image
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/png , image/jpeg, image/webp"
                        onChange={previewImage}
                      />
                    </label>
                  </div>
                </div>

                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div className="bg-gray-50 px-10 py-8 sm:px-8 text-center">
              <input
                type="submit"
                className="btn btn-outline btn-primary my-3 w-1/3 text-xl rounded-full text-black-600"
                disabled={loading}
                value={loading ? "Creating..." : "Create Community"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCommunity;
