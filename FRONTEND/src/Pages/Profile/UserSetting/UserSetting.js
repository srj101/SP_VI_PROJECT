import React, { useContext, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineLocalOffer } from "react-icons/md";
import "./UserSetting.css";
import { AiFillCamera } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import { API_URL } from "../../../API/config";
import { useAlert } from "react-alert";
import ChangePassword from "../../../Components/Password/ChangePassword";
import { useNavigate } from "react-router-dom";

const UserSetting = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // current user
  const [loading, setLoading] = useState(false); // loading state
  const alert = useAlert(); // alert
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    // react-hook-form
    {
      defaultValues: {
        // default values
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        location: user.location,
      },
    }
  );
  const [uploadImage, setUploadImage] = useState(user.coverPicture); // cover picture
  const [imgFile, setImageFile] = useState(null); // cover picture file
  const [profileuploadImage, setProfileUploadImage] = useState(
    user.profilePicture
  ); // profile picture
  const [profileimgFile, setProfileImageFile] = useState(null); // profile picture file

  const previewImage = (event) => {
    // Image preview
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
    // checking file type
    if (
      fileType !== "image/jpeg" &&
      fileType !== "image/jpg" &&
      fileType !== "image/png"
    ) {
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
    setImageFile(imageFiles[0]);
    const imageFilesLength = imageFiles.length;
    if (imageFilesLength > 0) {
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      setUploadImage(imageSrc);
    }
  };

  const profileImage = (event) => {
    // Image preview
    const imageFiles = event.target.files;
    const fileSize = event.target.files[0].size / 1024 / 1024;
    const fileType = event.target.files[0].type;
    if (fileSize > 2) {
      setProfileUploadImage(null);
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
    // checking file type
    if (
      fileType !== "image/jpeg" &&
      fileType !== "image/jpg" &&
      fileType !== "image/png"
    ) {
      setProfileUploadImage(null);
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
    setProfileImageFile(imageFiles[0]);
    const imageFilesLength = imageFiles.length;
    if (imageFilesLength > 0) {
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      setProfileUploadImage(imageSrc);
    }
  };

  const handleUserSetting = async (data) => {
    //getting data from form
    const formData = new FormData();

    const p = data.newPassword ? data.newPassword : user.password;

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("location", data.location);
    formData.append("profilePicture", profileimgFile);

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/user/updateUser`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      if (data.message) {
        alert.error(data.message);
      }
      if (data.user) {
        alert.success("Profile updated successfully");
      }
      setLoading(false);
      navigate("/main/profileUser");
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  return (
    <div className="w-full">
      <div className=" bg-white shadow-lg px-5 py-3 h-full fixed  w-[300px] hidden lg:block">
        <div class="flex items-start">
          <ul
            class="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4 ver"
            id="tabs-tabVertical"
            role="tablist"
          >
            <li class="nav-item flex-grow text-center" role="presentation">
              <a
                href="#tabs-profileEdit"
                class="
          nav-link
          flex
          items-center
          leading-tight
          uppercase
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100 hover:rounded-2xl
          focus:border-transparent
          active
        "
                id="tabs-home-tabVertical"
                data-bs-toggle="pill"
                data-bs-target="#tabs-profileEdit"
                role="tab"
                aria-controls="tabs-profileEdit"
                aria-selected="true"
              >
                <p className="mr-3 text-lg text-black">
                  <BiEdit></BiEdit>
                </p>
                <p className="text-lg text-black">Profile Setting</p>
              </a>
            </li>
            <li class="nav-item flex-grow text-center" role="presentation">
              <a
                href="#tabs-premeumOffer"
                class="
          nav-link
          flex
          items-center
          leading-tight
          uppercase
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100 hover:rounded-2xl
          focus:border-transparent
        "
                id="tabs-profile-tabVertical"
                data-bs-toggle="pill"
                data-bs-target="#tabs-premeumOffer"
                role="tab"
                aria-controls="tabs-premeumOffer"
                aria-selected="false"
              >
                <p className="mr-3 text-lg text-black">
                  <MdOutlineLocalOffer></MdOutlineLocalOffer>
                </p>
                <p className="text-lg text-black">Password Change</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="block lg:hidden">
        <ul
          class="
  nav nav-tabs nav-justified
  flex flex-col
  md:flex-row
  flex-wrap
  list-none
  border-b-0
  px-10
  mb-4
"
          id="tabs-tabJustify"
          role="tablist"
        >
          <li class="nav-item flex-grow text-center" role="presentation">
            <a
              href="#tabs-profileEdit"
              class="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    "
              id="tabs-home-tabJustify"
              data-bs-toggle="pill"
              data-bs-target="#tabs-profileEdit"
              role="tab"
              aria-controls="tabs-profileEdit"
              aria-selected="true"
            >
              Profile Setting
            </a>
          </li>
          <li class="nav-item flex-grow text-center" role="presentation">
            <a
              href="#tabs-premeumOffer"
              class="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
              id="tabs-profile-tabJustify"
              data-bs-toggle="pill"
              data-bs-target="#tabs-premeumOffer"
              role="tab"
              aria-controls="tabs-premeumOffer"
              aria-selected="false"
            >
              Change Password
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center ml-0 lg:ml-[300px]">
        <div className="tab-content w-4/5 " id="tabs-tabContentVertical">
          <div
            className="tab-pane fade show active"
            id="tabs-profileEdit"
            role="tabpanel"
            aria-labelledby="tabs-home-tabVertical"
          >
            <div className=" py-10">
              <form onSubmit={handleSubmit(handleUserSetting)}>
                <div>
                  <div class="img-container">
                    <h1>Profile Image Upload</h1>
                    <div class="avatar-upload">
                      <div class="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                          onChange={profileImage}
                        />
                        <label for="imageUpload" className="relative">
                          <AiFillCamera className="absolute top-[5px] left-[5px] text-2xl"></AiFillCamera>
                        </label>
                      </div>
                      <div class="avatar-preview">
                        <div
                          id="imagePreview"
                          style={{
                            backgroundImage: profileuploadImage
                              ? `url(${profileuploadImage})`
                              : `url('/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg')`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3">
                    <div className="w-full">
                      <label htmlFor="">Change your first name</label>
                      <input
                        type="text"
                        {...register("firstName")}
                        defaultValue={user.firstName}
                        placeholder="Type here"
                        className="input input-bordered input-secondary w-full my-3"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Change your last name</label>
                      <input
                        type="text"
                        {...register("lastName")}
                        defaultValue={user.lastName}
                        placeholder="Type here"
                        className="input input-bordered input-secondary w-full my-3"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-full">
                      <label htmlFor="">Change your address</label>
                      <input
                        type="text"
                        {...register("location")}
                        defaultValue={user.location}
                        placeholder="Type here"
                        className="input input-bordered input-secondary w-full my-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center my-5">
                  <label>
                    <input
                      className="btn bg-primary hover:bg-blue-700 mr-3"
                      value="Save"
                      type="submit"
                    />
                  </label>
                  <label>
                    <input
                      className="btn bg-red-700 hover:bg-red-800 mr-3"
                      value="Cancel"
                      type="reset"
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div
            class="tab-pane fade "
            id="tabs-premeumOffer"
            role="tabpanel"
            aria-labelledby="tabs-profile-tabVertical"
          >
            <ChangePassword />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserSetting;
