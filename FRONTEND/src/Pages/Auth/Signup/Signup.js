import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // react-hook-form
  const { createUser, user, loading, token, pending } = useContext(AuthContext); // this is the function from AuthProvider
  const [signUpError, setSignUPError] = useState(""); // this is the error state
  const navigate = useNavigate();
  const alert = useAlert();
  const location = useLocation();

  if (!loading && user) {
    return <Navigate to="/main" state={{ from: location }} replace></Navigate>;
  }

  const handleSignUp = async (data) => {
    const dob = new Date(data.dob);

    // Check if 18 years old

    if (dob.getFullYear() + 18 > new Date().getFullYear()) {
      alert.error("You must be 18 years old to sign up");
      return;
    }

    setSignUPError("");
    await createUser(data);
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <input
              type="text"
              {...register("fname", {
                required: "First name is Required",
              })}
              className="
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
              id="exampleInput123"
              aria-describedby="emailHelp123"
              placeholder="First name"
            />
            {errors.fname && (
              <p className="text-red-500">{errors.fname.message}</p>
            )}
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              {...register("lname", {
                required: "Last name is Required",
              })}
              className="
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
              id="exampleInput124"
              aria-describedby="emailHelp124"
              placeholder="Last name"
            />
            {errors.lname && (
              <p className="text-red-500">{errors.lname.message}</p>
            )}
          </div>
        </div>
        <div className="form-group mb-6">
          <input
            type="email"
            {...register("email", {
              required: "Email is Required",
              validate: (value) => {
                if (value.includes("@")) {
                  return true;
                } else {
                  return "Invalid email address";
                }
              },
            })}
            className="block
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
            id="exampleInput125"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group mb-6">
          <input
            type="password"
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 6,
              },
            })}
            className="block
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
            id="exampleInput126"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group mb-6">
          <input
            type="password"
            {...register("confirmpassword", {
              required: "Confirm password is Required",
              minLength: {
                value: 6,
              },
            })}
            className="block
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
            id="confirmPassword"
            placeholder="Confirm Password"
          />
          {errors.confirmpassword && (
            <p className="text-red-500">{errors.confirmpassword.message}</p>
          )}
        </div>

        <div className="form-group mb-6">
          <input
            type="text"
            {...register("location", {
              required: "Location is Required",
            })}
            className="block
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
            id="location"
            placeholder="Location"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="form-group mb-6">
          <select
            {...register("gender", {
              required: "Gender is Required",
            })}
            className="block
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
          >
            <option disabled value="" selected>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <div
            className="datepicker relative form-floating mb-2 xl:w-96"
            data-mdb-toggle-button="false"
          >
            <input
              type="date"
              {...register("dob", {
                required: "Select a date",
              })}
              max={new Date().toISOString().split("T")[0]}
              placeholder="Date of birth"
              id="exampleInput130"
              className="block w-full px-3
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
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
        </div>
        <div className="form-group form-check text-center mb-6">
          <input
            type="checkbox"
            {...register("value", {
              required: true,
            })}
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
            id="exampleCheck25"
          />
          {errors.value && (
            <p className="text-red-500">{errors.value.message}</p>
          )}
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="exampleCheck25"
          >
            Accept the terms and conditions
          </label>
        </div>
        <input
          type="submit"
          value={loading || pending ? "Signing Up..." : "Sign Up"}
          disabled={loading || pending}
          onSubmit={handleSubmit(handleSignUp)}
          className="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
        />

        <p className="text-gray-800 mt-6 text-center">
          Already Have an account
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
          >
            Login
          </Link>
        </p>
        {signUpError && <p className="text-red-600">{signUpError}</p>}
      </form>
      <Toaster />
    </div>
  );
};

export default Signup;
