import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../API/config";
import gravatarUrl from "gravatar-url";
import { useAlert } from "react-alert";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useNavigate();
  const location = useLocation();
  const [skip, setSkip] = useState(0);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(true);
  const alert = useAlert();
  // console.log(user);

  const createUser = async (data) => {
    setLoading(true);
    // console.log("create user Data:", data)
    try {
      const user = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          firstName: data.fname,
          lastName: data.lname,
        }),
      });
      const res = await user.json();
      console.log(res);
      if (res.message) {
        alert.error(res.message);

        setLoading(false);
        return;
      }
      localStorage.setItem("token", res.token);
      setToken(res.token);

      await getCurrentUser(res.token);

      if (user) {
        router("/main", { replace: true });
      }
      setLoading(false);

      if (res.error) {
        alert.error(res.error.message);
        setLoading(false);
        return res.error;
      }
    } catch (error) {
      console.log(error);
      alert.error("Something went wrong");
      setLoading(false);
      return error;
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const user = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await user.json();
      console.log(res);

      if (res.message) {
        alert.error(res.message);
        setLoading(false);
        return res.message;
      }
      localStorage.setItem("token", res.token);
      setToken(res.token);
      await getCurrentUser(res.token);

      if (user && res.token) {
        router("/main", { replace: true });
      }

      setLoading(false);
    } catch (error) {
      alert.error(error.message);

      setLoading(false);
      return error;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router("/login", { replace: true });
  };

  const getCurrentUser = async (token) => {
    setLoading(true);
    setPending(true);
    try {
      const data = await fetch(`${API_URL}/api/v1/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();

      setUser(res.user);

      setLoading(false);
      setPending(false);

      // console.log("current user", res.user);
    } catch (error) {
      setLoading(false);
      setPending(false);

      return error;
    }
  };

  const checkLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await getCurrentUser(token);
    }
    if (
      (user && location.pathname === "/login") ||
      (user && location.pathname === "/sign-up")
    ) {
      router("/main", { replace: true });
    }
  };

  useEffect(() => {
    console.log(location.pathname);
    checkLoggedIn();
  }, [router, location]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser(token);
    }
    setPending(false);
    setLoading(false);
  }, [location]);

  const authInfo = {
    user,
    createUser,
    signIn,
    logOut,
    loading,
    token,
    skip,
    pending,
    setSkip,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
