import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import AuthHeader from "../Components/AuthHeader";
import FormHeader from "../Components/FormHeader";
import FormFooter from "../Components/FormFooter";
import FormErrorBar from "../Components/FormErrorBar";
import InputLabel from "../Components/InputLabel";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useSignup } from "../hooks/useSignup";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isLoading } = useSignup();
  const { reset, register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  async function onSubmit(formData: FieldValues) {
    const { fullName, email, password } = formData;
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md flex flex-col items-center justify-center ">
        <AuthHeader description="Create your account to start tracking expenses." />

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 md:w-2xl dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
          <FormHeader
            heading="Create Account"
            description="Fill in your information to get started"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field*/}
            <div>
              <InputLabel labelText="Full Name" />
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  errorMessage={errors?.fullName?.message as string}
                  placeholder="Enter your full name"
                  registerObject={register("fullName", {
                    required: "This field is required",
                    minLength: {
                      value: 1,
                      message: "Name should be of atleast 1 character",
                    },
                  })}
                />
              </div>
              <FormErrorBar
                errorMessage={errors?.fullName?.message as string}
              />
            </div>

            {/* Email address */}
            <div>
              <InputLabel labelText="Email Address" />
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="email"
                  errorMessage={errors?.email?.message as string}
                  placeholder="Enter your email"
                  registerObject={register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
                    },
                  })}
                />
              </div>
              <FormErrorBar errorMessage={errors?.email?.message as string} />
            </div>

            {/* Password Field */}
            <div>
              <InputLabel labelText="Password" />
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  errorMessage={errors?.password?.message as string}
                  placeholder="Enter your password"
                  registerObject={register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password needs a minimum of 8 characters",
                    },
                  })}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  buttonDesign="icon"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <FormErrorBar
                errorMessage={errors?.password?.message as string}
              />
            </div>

            {/* Confirm Password Field (Signup only) */}
            <div>
              <InputLabel labelText="Confirm Password" />
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  errorMessage={errors?.confirmPassword?.message as string}
                  placeholder="Confirm your password"
                  registerObject={register("confirmPassword", {
                    required: "This field is required",
                    validate: (value: string) =>
                      value === getValues().password ||
                      "Passwords need to match",
                  })}
                />
                <Button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  buttonDesign="icon"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <FormErrorBar
                errorMessage={errors?.confirmPassword?.message as string}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" buttonDesign="primary" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing up...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <FormFooter
            pathTo="/signin"
            destination="Sign In"
            message="Already have an account?"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
