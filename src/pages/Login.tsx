import React, { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import AuthHeader from "../Components/AuthHeader";
import FormHeader from "../Components/FormHeader";
import FormFooter from "../Components/FormFooter";
import FormErrorBar from "../Components/FormErrorBar";
import Input from "../Components/Input";
import InputLabel from "../Components/InputLabel";
import Button from "../Components/Button";
import { useSignin } from "../hooks/useSignin";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isLoading } = useSignin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  async function onSubmit(formData: FieldValues) {
    const { email, password } = formData;
    signin(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        <AuthHeader description=" Welcome back! Please sign in to continue." />

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300 border-gray-100 md:w-2xl">
          <FormHeader
            heading="Sign In"
            description="Enter your credentials to access your account"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Submit Button */}
            <Button type="submit" buttonDesign="primary" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <FormFooter
            pathTo="/signup"
            message="Don't have an account?"
            destination="Sign up"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
