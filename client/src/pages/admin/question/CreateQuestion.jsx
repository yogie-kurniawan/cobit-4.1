import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../../features/admin/questionSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import Select from "../../../components/admin/Select";
import Textarea from "../../../components/admin/Textarea";
import "react-toastify/dist/ReactToastify.css";

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const prosesRef = useRef(null);
  const pertanyaanRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefaault();
    dispatch(
      createQuestion({
        proses: prosesRef.current.value,
        pertanyaan: pertanyaanRef.current.value,
      })
    );
  };
  return (
    <Section>
      <SectionTitle title="Tambah Pertanyaan"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/questions" className="btn-sm-primary">
              Kembali
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Pertanyaan" />
                <Select ref={prosesRef}></Select>
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Pertanyaan" />
                <Textarea ref={pertanyaanRef} />
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Section>
  );
};

export default CreateQuestion;
