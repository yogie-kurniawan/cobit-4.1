import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, updateAdmin } from "../../../features/admin/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";

const dataAdmin = {
  _id: 1,
  nama: "John",
  username: "john",
  password: "123",
  noTelepon: "082388382700",
};

const EditAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const namaRef = useRef(null);
  const usernameRef = useRef(null);
  const noTeleponRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(getAdmin(id));
  }, [dispatch]);

  const admin = useSelector((state) => state.admins.admin);
  console.log(id, admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama: namaRef.current.value,
      username: usernameRef.current.value,
      noTelepon: noTeleponRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(updateAdmin(id, data))
      .then((response) => {
        toast.success(response.payload.data.message);
        clearForm();
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
      <SectionTitle title="Edit Admin"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/admins" className="btn-sm-primary">
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
                  value={admin.nama}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Username" />
                <Input
                  type="text"
                  placeholder="Masukkan username..."
                  ref={usernameRef}
                  value={admin.username}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="No Telepon" />
                <Input
                  type="text"
                  placeholder="Masukkan No Telepon..."
                  ref={noTeleponRef}
                  value={admin.noTelepon}
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
                <button type="submit" className="btn-sm-primary">
                  Simpan
                </button>
                <button type="reset" className="btn-sm-secondary">
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

export default EditAdmin;
