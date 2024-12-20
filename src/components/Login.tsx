import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";

const url = "https://stacklearning-be-h0pq.onrender.com/api/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(url, {
        emailAddress: email,
        passWord: password,
      });

      if (response.status === 400) {
        console.log("status is 400");
      }
      if (response.data.isSuccess) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        toast.success("Logged in successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            fontSize:"12px"
          },
        });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Invalid email, please sign up", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
          },
        });
      }
    } catch (error: any) {
      console.error("An error occurred during sign-up:", error);
      toast.error(error.response.data.message, {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
          fontSize:"12px"
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <Toaster position="bottom-center" />
      <Card className="w-[90%] sm:w-[400px] m-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {emailError}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="o83#hkfd8%^7h"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-[10px] mt-1 ml-2">
                  {passwordError}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="bg-primaryNew text-white w-full flex justify-center items-center"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : (
              "Login"
            )}
          </Button>
          <div className="flex gap-1">
            <p className="text-xs">Not a user?</p>
            <Link
              to={"/signup"}
              className="text-orange text-xs font-medium underline"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
