import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../../features/admin/questionSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./logo.jpeg";

const ml = [
  {
    proses: "DS1",
    index: 4.9,
    namaProses: "Define and Manage Service Levels",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS2",
    index: 3.2,
    namaProses: "Manage Third-party Services",
    status: "3 - Defined",
    keterangan:
      "Proses terdefinisi dengan baik, namun perlu peningkatan manajemen.",
  },
  {
    proses: "DS3",
    index: 4.6,
    namaProses: "Manage Performance and Capacity",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS4",
    index: 4.7,
    namaProses: "Ensure Continuous Service",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS5",
    index: 4.4,
    namaProses: "Ensure Systems Security",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "DS6",
    index: 4.9,
    namaProses: "Identify and Allocate Costs",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME1",
    index: 4.9,
    namaProses: "Monitor and Evaluate IT Performance",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME2",
    index: 4.8,
    namaProses: "Monitor and Evaluate Internl Control",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME3",
    index: 4.6,
    namaProses: "Ensuring Regulatory Compliance",
    status: "4 - Managed",
    keterangan: "Proses telah berulang, namun belum terkelola dengan baik.",
  },
  {
    proses: "ME4",
    index: 2.8,
    namaProses: "Providing IT Governance",
    status: "2 - Repeatable",
    keterangan: "Belum terlaksana sepenuhnya",
  },
];

const PrintQuestion = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);

  useEffect(() => {
    dispatch(getQuestions())
      .then((response) => {
        if (response.payload.error) {
          toast.error(response.payload.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    window.print();
  }, [dispatch, questions]);

  let totalQuestions = 0;

  return (
    <section className="font-times text-black">
      <div className="py-4">
        <ToastContainer />
        <div className="flex w-full text-center border-b-4 border-b-black pt-2 pb-4">
          <div className="w-[120px] flex justify-end">
            <img src={Logo} alt="" className="w-[100px] ml-8" />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-4xl font-bold">UTAMA SERVICE AUTOCARE</h1>
            <h1 className="text-3xl font-bold uppercase">
              Car repair and maintenance service
            </h1>
            <p>
              Jl. S. Parman No.164, Ulak Karang Sel., Kec. Padang Utara, Kota
              Padang,
              <br /> Sumatera Barat Petunjuk. 0751-443198, +6282385733344
            </p>
          </div>
        </div>
        <div className="border-b-2 border-black w-full mt-[0.1rem]"></div>

        <div className="mt-10">
          <h1 className="text-center font-bold text-2xl mb-8">
            Laporan Hasil Analisa Tingkat Kematangan Sistem Penjualan
          </h1>
          <table
            border="1"
            className="w-full border border-black"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr className="border border-black p-2 text-center">
                <th className="border border-black p-2 text-center w-[50px]">
                  No.
                </th>
                <th className="border border-black p-2 text-center w-[100px]">
                  Proses
                </th>
                <th className="border border-black p-2 text-center w-[100px]">
                  Nama Proses
                </th>
                <th className="border border-black p-2 text-center">
                  Index Maturity Level
                </th>
                <th className="border border-black p-2 text-center">Skala</th>
                <th className="border border-black p-2 text-center">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              {ml.map((question, index) => {
                totalQuestions += 1;
                return (
                  <tr className="border border-black p-2" key={index}>
                    <td className="border border-black px-2 py-1 text-center w-[50px]">
                      {++index}
                    </td>
                    <td className="border border-black px-2 py-1 text-center w-[100px]">
                      {question.proses}
                    </td>
                    <td className="border border-black px-2 py-1 text-center w-[100px]">
                      {question.namaProses}
                    </td>
                    <td className="border border-black px-2 py-1 text-center w-[100px]">
                      {question.index}
                    </td>
                    <td className="border border-black px-2 py-1 text-center w-[100px]">
                      {question.status}
                    </td>
                    <td className="border border-black px-2 py-1 text-left w-[100px]">
                      {question.keterangan}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <div className="w-[200px] text-center">
              <p>Mengetahui,</p>
              <p>Owner</p>
              <div className="h-[100px]"></div>
              <p className="underline">Harmen S</p>
              <p>NIB : 1503220020899</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintQuestion;
