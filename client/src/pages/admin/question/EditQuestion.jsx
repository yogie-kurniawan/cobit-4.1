import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../../features/admin/questionSlice";
import { ToastContainer, toast } from "react-toastify";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";
import Textarea from "../../../components/admin/Textarea";
import Select from "../../../components/admin/Select";

const dataQuestion = {
  _id: 1,
  process: { kode: "DS1" },
  pertanyaan:
    "Seberapa baik pengguna layanan memahami tingkat layanan yang diharapkan ?",
};

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const prosesRef = useRef(null);
  const pertanyaanRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      proses: prosesRef.current.value,
      pertanyaan: pertanyaanRef.current.value,
    };
    dispatch(updateQuestion(data))
      .then((response) => {
        toast.success(response.payload.data.message);
        clearForm();
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
      <SectionTitle title="Edit Pertanyaan"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/questiones" className="btn-sm-primary">
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
                  <option value="">{dataQuestion.process.kode}</option>
                </Select>
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Pertanyaan" />
                <Textarea
                  placeholder="Masukkan Pertanyaan..."
                  ref={pertanyaanRef}
                >
                  {dataQuestion.pertanyaan}
                </Textarea>
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

export default CreateQuestion;
