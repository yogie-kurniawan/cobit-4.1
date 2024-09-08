import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcesses } from "../../../features/admin/processSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrintProcess = () => {
  const dispatch = useDispatch();
  const processes = useSelector((state) => state.processes.processes);

  useEffect(() => {
    dispatch(getProcesses())
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
  }, [dispatch, processes]);

  let totalProcesses = 0;

  return (
    <section className="font-times text-black">
      <div>
        <ToastContainer />
        <h1 className="text-center font-bold text-3xl mb-8">Daftar Proses</h1>
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
                  Kode Proses
                </th>
                <th className="border border-black p-2 text-center">
                  Nama Proses
                </th>
                <th className="border border-black p-2 text-center">
                  Deskripsi Proses
                </th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => {
                totalProcesses += 1;
                return (
                  <tr className="border border-black p-2" key={index}>
                    <td className="border border-black p-2 text-center w-[50px]">
                      {++index}
                    </td>
                    <td className="border border-black p-2 text-center w-[100px]">
                      {process.domain.kode}
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
                  {totalProcesses}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PrintProcess;
