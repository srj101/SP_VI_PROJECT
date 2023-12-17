import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { API_URL } from "../../../API/config";

const CommunityMember = ({ member }) => {
  const { user } = member; // member is the object that is passed from CommunityMembersTab Component
  const { user: currentUser } = useContext(AuthContext); // this is the current user
  return (
    <Link
      to={`/main/profileUser/${currentUser?.id !== user.id ? user.id : ""}`}
    >
      <div className="flex justify-between ">
        <div className="flex">
          <div className="avatar mr-3">
            <div className="w-16 rounded">
              <img
                src={`${API_URL}/${user.profilePicture}`}
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
          <div>
            <div>
              <span className="mx-0 mr-1 text-lg font-bold">
                {user.firstName}
              </span>
              <span className="mx-0 text-lg font-bold">{user.lastName}</span>
            </div>
            <div>
              <span className="mx-0 text-sm">
                {user?.professions[0]?.profession.name}
              </span>
            </div>
          </div>
        </div>
        <div>
          {/* <button className="btn btn-ghost btn-circle h-0">
                    <div className="dropdown dropdown-top dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <BsThreeDotsVertical></BsThreeDotsVertical>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link className="flex items-center">

                                    <p><MdPersonAddAlt1 className='text-lg'></MdPersonAddAlt1></p>
                                    <p>Add Friend</p>

                                </Link>


                            </li>
                            <li  ><Link>
                                <p><CgProfile className='text-lg'></CgProfile></p>
                                <p>View Profile</p>

                            </Link></li>

                        </ul>

                    </div>
                </button> */}
        </div>
      </div>
    </Link>
  );
};

export default CommunityMember;
