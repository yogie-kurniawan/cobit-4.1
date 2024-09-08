import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDomains } from "../../../features/admin/domainSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrintDomain = () => {
  const dispatch = useDispatch();
  const domains = useSelector((state) => state.domains.domains);

  useEffect(() => {
    dispatch(getDomains())
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
  }, [dispatch, domains]);

  let totalDomains = 0;

  return (
    <section className="font-times text-black">
      <div>
        <ToastContainer />
        <h1 className="text-center font-bold text-3xl mb-8">Daftar Domain</h1>
        <div>
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
                  Kode Domain
                </th>
                <th className="border border-black p-2 text-center">
                  Nama Domain
                </th>
                <th className="border border-black p-2 text-center">
                  Deskripsi Domain
                </th>
              </tr>
            </thead>
            <tbody>
              {domains.map((process, index) => {
                totalDomains += 1;
                return (
                  <tr className="border border-black p-2" key={index}>
                    <td className="border border-black p-2 text-center w-[50px]">
                      {++index}
                    </td>
                    <td className="border border-black p-2 text-center w-[100px]">
                      {process.kode}
                    </td>
                    <td className="border border-black p-2">{process.nama}</td>
                    <td className="border border-black p-2">
                      {process.deskripsi}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border border-black p-2">
                <th className="border border-black p-2" colSpan={2}>
                  Total
                </th>
                <th className="border border-black p-2 text-left">
                  {totalDomains}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PrintDomain;
