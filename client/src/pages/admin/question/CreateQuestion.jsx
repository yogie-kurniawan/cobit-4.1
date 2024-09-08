import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../../features/admin/questionSlice";
import { getProcesses } from "../../../features/admin/processSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";
import Textarea from "../../../components/admin/Textarea";
import Select from "../../../components/admin/Select";

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prosesRef = useRef(null);
  const pertanyaanRef = useRef(null);
  const processes = useSelector((state) => state.processes.processes);

  useEffect(() => {
    dispatch(getProcesses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      proses: prosesRef.current.value,
      pertanyaan: pertanyaanRef.current.value,
    };
    dispatch(createQuestion(data))
      .then((response) => {
        if (!response.payload.error) {
          toast.success(response.payload.message);
          clearForm();
          setTimeout(() => {
            navigate("/admin/questions");
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
    prosesRef.current.value = "";
    pertanyaanRef.current.value = "";
  };
  return (
    <Section>
      <SectionTitle title="Tambah Pertanyaan"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/questions" className="btn-md-primary">
              Kembali
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Proses" />
                <Select ref={prosesRef}>
                  <option value="">--Pilih Proses--</option>
                  {processes.map((process, index) => (
                    <option value={process._id} key={index}>
                      {process.kode} - {process.nama}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Pertanyaan" />
                <Textarea
                  placeholder="Masukkan Pertanyaan..."
                  ref={pertanyaanRef}
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

export default CreateQuestion;
