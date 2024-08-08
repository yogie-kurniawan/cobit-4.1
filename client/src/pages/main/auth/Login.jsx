import React, { useRef } from "react";
import API from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const handleLogin = async () => {
      try {
        const result = await API.post(`/auth/login`, data);
        const token = result.data.token || "";
        localStorage.setItem("token", token);
        toast.success("login berhasil!");
        clearForm();
        navigate("/");
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };
    handleLogin();
  };

  const clearForm = () => {
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <section className="w-full bg-primary">
      <div className="max-w-screen-xl mx-auto min-h-[600px] px-4">
        <div className="w-full h-full flex items-center justify-center pt-28">
          <div className="max-w-[320px] w-full px-8 py-10 bg-white rounded-xl overflow-hidden shadow-xl">
            <form action="" onSubmit={handleSubmit}>
              <ToastContainer />
              <div className="mb-8">
                <h1 className="w-full text-center text-3xl font-bold text-gray-700 mb-1">
                  Login
                </h1>
                <p className="w-full text-center text-sm text-gray-500">
                  Masukkan username dan password
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    ref={usernameRef}
                    className="block w-full px-6 py-3 text-md text-gray-700 border border-gray-400 rounded-md focus:outline focus:outline-gray-600"
                    placeholder="Username"
                  ></input>
                </div>
                <div>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="block w-full px-6 py-3 text-md text-gray-700 border border-gray-400 rounded-md focus:outline focus:outline-gray-600"
                    placeholder="Password"
                  ></input>
                </div>
                <div>
                  <button
                    type="submit"
                    className="block w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all duration-300 ease-in"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <p className="text-xs text-gray-700 text-center">
                    Belum punya akun?{" "}
                    <Link to="/register" className="underline">
                      Registrasi
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
