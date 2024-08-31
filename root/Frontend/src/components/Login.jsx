import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from "../store/authSlice";
import { Logo, Input, Button } from "./index.js";
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth.js";
import { useForm } from 'react-hook-form';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (data) => {
    setErrorMessage("");
    setError("email", {});
    setError("password", {});

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));

        navigate("/all-posts");
      }
    } catch (err) {
      console.log(err); // Log the full error object for debugging

      // Check for specific error messages from Appwrite and set field errors accordingly
      if (err.message.includes("Invalid credentials")) {
        setErrorMessage("Invalid email or password. Please check your credentials.");
        setError("email", { type: "manual", message: "Invalid email or password" });
        setError("password", { type: "manual", message: "Invalid email or password" });
      } else if (err.message.includes("Password must be between 8 and 256 characters long")) {
        setErrorMessage("Password must be between 8 and 256 characters long.");
        setError("password", { type: "manual", message: "Password is too short" });
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='flex items-center justify-center px-4 sm:px-8 lg:px-16'>
      <div className={`w-full max-w-md bg-gray-100 rounded-xl p-6 sm:p-8 lg:p-10 border border-gray-300`}>
        <div className='mb-4 flex justify-center'>
          <span className="inline-block w-24">
            <Logo width='100%' />
          </span>
        </div>
        <h2 className="text-center text-black text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-black/60 mb-6">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {errorMessage && <p className="text-red-600 mt-8 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-4 sm:space-y-5'>

            {/* Email input */}
            <Input
              label="Email : "
              labelClassName="text-black"
              type="email"
              placeholder='Enter your email'
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                }
              })}
              className={`${errors.email ? 'border-red-500 text-red-500' : 'border-gray-300 text-black'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password input */}
            <Input
              label="Password : "
              labelClassName="text-black"
              type="password"
              placeholder='Enter your password'
              {...register("password", {
                required: "Password is required",
              })}
              className={`${errors.password ? 'border-red-500 text-red-500' : 'border-gray-300 text-black'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <Button
              type='submit'
              className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 sm:px-5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Log in
            </Button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
