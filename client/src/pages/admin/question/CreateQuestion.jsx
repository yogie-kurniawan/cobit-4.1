import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../../features/admin/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import Select from "../../../components/admin/Select";
import Textarea from "../../../components/admin/Textarea";
import "react-toastify/dist/ReactToastify.css";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const namaRef = useRef(null);
  const usernameRef = useRef(null);
  const noTelponRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createAdmin({
        nama: namaRef.current.value,
        username: usernameRef.current.value,
        noTelpon: noTelponRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };
  return (
    <Section>
      <SectionTitle title="Tambah Admin"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/admins" className="btn-sm-primary">
              Kembali
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Nama" />
                <Input
                  type="text"
                  placeholder="Masukkan nama..."
                  ref={namaRef}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Username" />
                <Input
                  type="text"
                  placeholder="Masukkan username..."
                  ref={usernameRef}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="No Telepon" />
                <Input
                  type="text"
                  placeholder="Masukkan No Telepon..."
                  ref={noTelponRef}
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

export default CreateAdmin;
