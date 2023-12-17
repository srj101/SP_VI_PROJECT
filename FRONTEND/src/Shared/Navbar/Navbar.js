import * as React from "react";
import "./Navbar.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Search from "../Search/Search";

import { AuthContext } from "../../Context/AuthProvider";
import {
  Group,
  Markunread,
  Message,
  MessageOutlined,
  People,
  PeopleAlt,
} from "@material-ui/icons";

import { Link, useNavigate } from "react-router-dom";

import NotificationDropDown from "../../Components/Notification/NotificationDropDown";

import FriendRequestDropDown from "../../Components/FriendRequest/FriendRequestDropDown";

import { AiOutlineHome } from "react-icons/ai";

import { CgCommunity } from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../API/config";
import Loading from "../Loading/Loading";
import gravatarUrl from "gravatar-url";

export default function PrimarySearchAppBar() {
  const [active, setActive] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { logOut } = React.useContext(AuthContext);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [friendRequestDrowpDown, setFriendRequestDrowpDown] =
    React.useState(false);
  const [isOpen, setIsopen] = React.useState(false);
  const [sidebar, setSidebar] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const showSidebar = () => {
    //function to show sidebar

    setSidebar(!sidebar);
  };

  const menuRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setSidebar(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleLogOut = async () => {
    //function to logout
    await logOut();
    navigate("/login", { replace: true });
  };

  const handleProfileMenuOpen = (event) => {
    //function to open profile menu
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    //function to close profile menu
    setAnchorEl(null);
  };

  const handletoggle = () => {
    //function to open search bar
    setActive(true);
  };

  const menuId = "primary-search-account-menu"; //menu id
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-400"
          aria-labelledby="dropdownLargeButton"
        >
          <li onClick={handleMenuClose}>
            <Link
              to="/main/profileuser"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li onClick={handleMenuClose}>
            <Link
              onClick={handleLogOut}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </Menu>
  );

  const fetchHasFriendRequest = async () => {
    const res = await fetch(`${API_URL}/api/v1/user/hasFriendRequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    return data;
  };

  const HasFriendRequest = useQuery({
    queryKey: ["hasFriendRequest"],
    queryFn: fetchHasFriendRequest,
  });

  if (!HasFriendRequest.data) {
    return <Loading />;
  }
  if (HasFriendRequest.isLoading) {
    return <Loading />;
  }
  if (HasFriendRequest.isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div
        className="navbar bg-base-100 shadow-md sticky top-0  w-full z-50"
        ref={menuRef}
      >
        <div className="navbar-start w-[5%]">
          <div className="">
            <Link to="#" className="menu-bars1">
              <svg
                onClick={() => setSidebar(!sidebar)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-0 lg:ml-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </Link>
          </div>

          <nav
            className={`w-[100%] lg:w-[17%] ${sidebar ? "nav-menu active bg-base-100" : "nav-menu bg-base-100"
              }`}
          >
            <ul className="nav-menu-items">
              <li
                className="navbar-toggle flex items-center justify-center text-center shadow-md p-5"
                onClick={() => setSidebar(!sidebar)}
              >
                <p className="text-black text-2xl lg:text-xl mx-5 lg:mx-5 font-bold my-auto ">
                aiEmployeeBuds
                </p>
                <p className="my-auto bg-red-200-50 shadow-md rounded-full p-2">
                  <AiIcons.AiOutlineClose className="text-black font-bold cursor-pointer text-2xl lg:text-xl" />
                </p>
              </li>
              <li className="block lg:hidden mt-6 mx-3">
                <input
                  type="text"
                  placeholder="Search"
                  className={` w-full border rounded-xl shadow-md`}
                />
              </li>
              <li>
                <Link
                  to="/main"
                  className="navbar-toggle1 text-center mt-6 text-2xl lg:text-xl font-semibold hover:bg-slate-300 p-3 mx-3 rounded-md hover:shadow-md bg-slate-200 shadow-md flex items-center justify-center lg:justify-start"
                  onClick={showSidebar}
                >
                  <AiOutlineHome className="mr-2"></AiOutlineHome>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/main/community"
                  className="navbar-toggle1 text-center mt-6 text-2xl lg:text-xl font-semibold hover:bg-slate-300 p-3 mx-3 rounded-md hover:shadow-md bg-slate-200 shadow-md flex items-center justify-center lg:justify-start"
                  onClick={showSidebar}
                >
                  <CgCommunity className="mr-2"></CgCommunity>
                  Community
                </Link>
              </li>
              {/* <li >
                <Link to='/main/feedback' className="navbar-toggle1 text-center mt-6 text-2xl lg:text-xl font-semibold hover:bg-slate-300 p-3 mx-3 rounded-md hover:shadow-md bg-slate-200 shadow-md flex items-center justify-center lg:justify-start" onClick={showSidebar}>
                  <MdOutlineFeedback className='mr-2' ></MdOutlineFeedback>
                  Feedback
                </Link>
              </li> */}
            </ul>
          </nav>
          <div
            className={`sidebar-overlay ${sidebar === true ? "active" : ""}`}
          ></div>
        </div>
        <div className="navbar-start">
          <Link
            to="/main"
            className="normal-case text-sm lg:text-xl ml-2 lg:ml-5 font-bold"
          >
            aiEmployeeBuds
          </Link>
        </div>
        <div className="navbar-end flex">
          {/* Notification */}
          {/* <button onClick={() => setNotificationOpen(prev => !prev)} className="btn btn-ghost btn-circle ml-0 lg:ml-4">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button> */}
          {/* Message */}
          <Link
            to="/main/message"
            className="btn btn-ghost btn-circle ml-0 lg:ml-4"
          >
            <div className="indicator">
              <MessageOutlined />
            </div>
          </Link>
          {/* FriendRequest */}
          <button
            onClick={() => setFriendRequestDrowpDown((prev) => !prev)}
            className="btn btn-ghost btn-circle ml-0 lg:ml-4"
          >
            <div className="indicator">
              <PeopleAlt fontSize="medium" /> {/*Icon*/}
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> */}
              {HasFriendRequest.data.hasFriendRequest && (
                <span className="badge badge-xs badge-primary indicator-item"></span>
              )}
            </div>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-7 lg:w-8 rounded-full">
                  {user.profilePicture === null ? (
                    <img
                      src={gravatarUrl(user.email, {
                        size: 200,
                        default: "retro",
                      })}
                      alt=""
                    />
                  ) : (
                    <img
                      src={`${API_URL}/${user.profilePicture}`}
                      alt={user.fullName}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
              >
                <li>
                  <Link to="/main/profileuser" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/main/usersetting">Settings</Link>
                </li>
                <li>
                  <Link onClick={handleLogOut}>Logout</Link>
                </li>
              </ul>
            </div>
          </button>
        </div>
        {notificationOpen && (
          <NotificationDropDown
            setNotificationOpen={setNotificationOpen}
            notificationOpen={notificationOpen}
          />
        )}
        {friendRequestDrowpDown && (
          <FriendRequestDropDown
            friendRequestDrowpDown={friendRequestDrowpDown}
            setFriendRequestDrowpDown={setFriendRequestDrowpDown}
          />
        )}
      </div>
    </>
  );
}
