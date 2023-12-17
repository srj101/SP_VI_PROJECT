import React from "react";
import { Outlet } from "react-router-dom";
import person from "../Asset/person/person.png";

const WelcomeLayout = () => {
  return (
    <section className="main-container w-full h-screen ">
      <div className="image-overlay flex flex-col justify-center items-center text-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={person} alt="" />
          </div>
        </div>
        <h2 className="text-white text-4xl font-bold my-3">
          Welcome to aiEmployeApp
        </h2>
        <Outlet></Outlet>
      </div>
    </section>
  );
};

export default WelcomeLayout;
