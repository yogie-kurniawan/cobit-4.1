import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../features/admin/userSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const namaRef = useRef(null);
  const usernameRef = useRef(null);
  const noTeleponRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(getUser(id)).then();
  }, [dispatch, id]);

  const user = useSelector((state) => state.users.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama: namaRef.current.value,
      username: usernameRef.current.value,
      noTelepon: noTeleponRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(updateUser(id, data))
      .then((response) => {
        toast.success(response.payload.data.message);
        setTimeout(() => {
          navigate("/admin/users");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const clearForm = () => {
    namaRef.current.value = "";
    usernameRef.current.value = "";
    noTeleponRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <Section>
      <SectionTitle title="Edit User"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/users" className="btn-md-primary">
              Kembali
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Nama" />
                <Input
                  type="text"
                  placeholder="Masukkan nama..."
                  ref={namaRef}
                  value={user.nama}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Username" />
                <Input
                  type="text"
                  placeholder="Masukkan username..."
                  ref={usernameRef}
                  value={user.username}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="No Telepon" />
                <Input
                  type="text"
                  placeholder="Masukkan No Telepon..."
                  ref={noTeleponRef}
                  value={user.noTelepon}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Password" />
                <Input
                  type="password"
                  placeholder="Masukkan Password..."
                  ref={passwordRef}
                />
              </div>
              <div className="col-span-12 flex gap-1">
                <button type="submit" className="btn-md-primary">
                  Simpan
                </button>
                <button type="reset" className="btn-md-secondary">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Section>
  );
};

export default EditUser;
