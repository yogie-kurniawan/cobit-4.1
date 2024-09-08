import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../../features/admin/questionSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div>
        <ToastContainer />
        <h1 className="text-center font-bold text-3xl mb-8">
          Daftar Pertanyaan
        </h1>
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
                  Proses
                </th>
                <th className="border border-black p-2 text-center">
                  Pertanyaan
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => {
                totalQuestions += 1;
                return (
                  <tr className="border border-black p-2" key={index}>
                    <td className="border border-black p-2 text-center w-[50px]">
                      {++index}
                    </td>
                    <td className="border border-black p-2 text-center w-[100px]">
                      {question.process.kode}
                    </td>
                    <td className="border border-black p-2" key={index}>
                      {question.pertanyaan}
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
                  {totalQuestions}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PrintQuestion;
