import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProcess } from "../../../features/admin/processSlice";
import { getDomains } from "../../../features/admin/domainSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";
import Textarea from "../../../components/admin/Textarea";
import Select from "../../../components/admin/Select";

const CreateProcess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const domainRef = useRef(null);
  const namaRef = useRef(null);
  const kodeRef = useRef(null);
  const deskripsiRef = useRef(null);
  const domains = useSelector((state) => state.domains.domains);

  useEffect(() => {
    dispatch(getDomains());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      domain: domainRef.current.value,
      kode: kodeRef.current.value,
      nama: namaRef.current.value,
      deskripsi: deskripsiRef.current.value,
    };
    dispatch(createProcess(data))
      .then((response) => {
        if (!response.payload.error) {
          toast.success(response.payload.message);
          clearForm();
          setTimeout(() => {
            navigate("/admin/processes");
          }, 1000);
        } else {
          toast.error(response.payload.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const clearForm = () => {
    domainRef.current.value = "";
    kodeRef.current.value = "";
    namaRef.current.value = "";
    deskripsiRef.current.value = "";
  };
  return (
    <Section>
      <SectionTitle title="Tambah Proses"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/processes" className="btn-md-primary">
              Kembali
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Domain" />
                <Select ref={domainRef}>
                  <option value="">--Pilih Domain--</option>
                  {domains.map((domain, index) => (
                    <option value={domain._id} key={index}>
                      {domain.kode} - {domain.nama}
                    </option>
                  ))}
                </Select>
              </div>
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

export default CreateProcess;
