import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDomain } from "../../../features/admin/domainSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";
import Textarea from "../../../components/admin/Textarea";

const CreateDomain = () => {
  const dispatch = useDispatch();
  const namaRef = useRef(null);
  const kodeRef = useRef(null);
  const deskripsiRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kode: kodeRef.current.value,
      nama: namaRef.current.value,
      deskripsi: deskripsiRef.current.value,
    };
    dispatch(createDomain(data))
      .then((response) => {
        toast.success(response.payload.data.message);
        clearForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const clearForm = () => {
    kodeRef.current.value = "";
    namaRef.current.value = "";
    deskripsiRef.current.value = "";
  };
  return (
    <Section>
      <SectionTitle title="Tambah Domain"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/domains" className="btn-sm-primary">
              Kembali
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Kode" />
                <Input
                  type="text"
                  placeholder="Masukkan Kode..."
                  ref={kodeRef}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Nama" />
                <Input
                  type="text"
                  placeholder="Masukkan Nama..."
                  ref={namaRef}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Deskripsi" />
                <Textarea
                  placeholder="Masukkan Deskripsi..."
                  ref={deskripsiRef}
                ></Textarea>
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

export default CreateDomain;
