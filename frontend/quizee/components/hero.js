import React, { useState } from "react";
import ContactForm from "./contactform/page";
import Login from "./login";

const Hero = () => {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <>
    <div className="hero">
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-5">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Let us see if we make Fixit AI together{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Quizee App for all your Quiz needs
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                It is a simple application because of limited time. Each time
                you have to login
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setSignup(!signup)}
                >
                  SignUp
                </button>
                <button
                  className="text-sm/6 font-semibold text-gray-900"
                  onClick={() => setLogin(!login)}
                >
                  LogIn <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    {signup && (
      <ContactForm />
    )
    };
    {login && (
      <Login />
    )}
    </>
  );
};

export default Hero;
