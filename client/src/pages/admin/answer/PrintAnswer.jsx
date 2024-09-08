import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../../features/admin/answerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Question = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answers.answers);

  useEffect(() => {
    dispatch(getAnswers()).then((response) => {
      window.print();
    });
  }, [dispatch]);

  useEffect(() => {
    window.print();
  }, [dispatch, answers]);

  let totalAnswers = 0;

  return (
    <section className="font-times text-black">
      <div>
        <ToastContainer />
        <h1 className="text-center font-bold text-3xl mb-8">Daftar Jawaban</h1>
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
                <th className="border border-black p-2 text-center w-[200px]">
                  User
                </th>
                <th className="border border-black p-2 text-center w-[400px]">
                  Pertanyaan
                </th>
                <th className="border border-black p-2 text-center">
                  Nilai Jawaban
                </th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer, index) => {
                totalAnswers += 1;
                return (
                  <tr className="border border-black p-2" key={index}>
                    <td className="border border-black p-2 text-center w-[50px]">
                      {++index}
                    </td>
                    <td className="border border-black p-2 w-[100px]">
                      {answer.user?.nama || ""}
                    </td>
                    <td className="border border-black p-2  w-[400px]">
                      {answer.question?.pertanyaan || ""}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {answer.nilai}
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
                  {totalAnswers}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Question;
