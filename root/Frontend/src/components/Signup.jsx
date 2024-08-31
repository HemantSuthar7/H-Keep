import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../store/authSlice";
import { Logo, Input, Button } from "./index.js";
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth.js";
import { useForm } from 'react-hook-form';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    setFieldErrors({});
    try {
      console.log(data);

      const userData = await authService.createAccount(data);
      console.log(userData);

      if (userData) {
        const userData_ = await authService.getCurrentUser();
        console.log(`the user data from getCurrentUser is : ${userData_}`);

        if (userData_) dispatch(login(userData_));
        navigate("/");
      }

    } catch (error) {
      setError(error.message);

      if (error.message.includes("Invalid `email` param") || error.message.includes("Invalid credentials")) {
        setFieldErrors((prev) => ({ ...prev, email: true }));
      }
      if (error.message.includes("Invalid `password` param") || error.message.includes("Password must be between 8 and 256 characters long")) {
        setFieldErrors((prev) => ({ ...prev, password: true }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center mx-4 sm:mx-8 lg:mx-16">
      <div className="w-full max-w-md bg-gray-100 rounded-xl p-6 border border-gray-300 sm:p-8 lg:p-10">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-24">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-black text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-black/60 mb-5">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-4">

            <div>
              <Input
                label="Full Name : "
                labelClassName="text-black"
                placeholder="Enter your Full name"
                className={errors.name || fieldErrors.name ? 'border-red-500 text-red-500' : ''}
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Input
                label="Email : "
                labelClassName="text-black"
                placeholder="Enter your email"
                type="email"
                className={errors.email || fieldErrors.email ? 'border-red-500 text-red-500' : ''}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <Input
                label="Password : "
                labelClassName="text-black"
                placeholder="Enter your password"
                type="password"
                className={errors.password || fieldErrors.password ? 'border-red-500 text-red-500' : ''}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 sm:px-5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Create Account
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
