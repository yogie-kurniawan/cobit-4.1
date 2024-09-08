import React, { useState, useEffect, useRef } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDomain, updateDomain } from "../../../features/admin/domainSlice";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../../components/admin/Input";
import Label from "../../../components/admin/Label";
import "react-toastify/dist/ReactToastify.css";
import Textarea from "../../../components/admin/Textarea";

const EditDomain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const namaRef = useRef(null);
  const kodeRef = useRef(null);
  const deskripsiRef = useRef(null);
  const [domain, setDomain] = useState({});

  useEffect(() => {
    dispatch(getDomain(id))
      .then((res) => {
        if (res.payload.status == "error") throw new Error(res.payload.message);
        setDomain(res.payload.domain);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kode: kodeRef.current.value,
      nama: namaRef.current.value,
      deskripsi: deskripsiRef.current.value,
    };
    dispatch(updateDomain({ id, data }))
      .then((res) => {
        if (res.payload.status == "error") throw new Error(res.payload.message);
        toast.success(res.payload.message, {});
        clearForm();
        setTimeout(() => {
          navigate("/admin/domains");
        }, 1000);
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
      <SectionTitle title="Edit Domain"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/domains" className="btn-md-primary">
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
                  value={domain?.kode}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Nama" />
                <Input
                  type="text"
                  placeholder="Masukkan Nama..."
                  ref={namaRef}
                  value={domain?.nama}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                <Label label="Deskripsi" />
                <Textarea
                  placeholder="Masukkan Deskripsi..."
                  ref={deskripsiRef}
                  value={domain?.deskripsi}
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

export default EditDomain;
