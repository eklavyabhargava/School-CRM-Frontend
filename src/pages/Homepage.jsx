import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => (
  <>
    <Header />
    <div className="container mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-5">Welcome to the School CRM</h1>
      <p className="text-lg mb-5">
        View assigned class, manage classes, teachers and students.
      </p>
    </div>
  </>
);

export default HomePage;
