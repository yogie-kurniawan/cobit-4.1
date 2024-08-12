import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../../features/admin/questionSlice";

const Kuisioner = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  return (
    <section className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 pt-14 pb-8">
        <div className="py-8">
          <h1 className="text-2xl text-gray-700 text-center font-bold mb-8">
            Kuesioner
          </h1>
          <div className="pt-8 pb-4">
            <form action="">
              <div className="flex flex-col gap-6 mb-6">
                {questions.map((question, index) => (
                  <div key={index}>
                    <label htmlFor="" className="block mb-2">
                      {++index}. {question.pertanyaan}
                    </label>
                    <select
                      name=""
                      id=""
                      className="border-gray-400 px-4 py-2 border rounded-md"
                    >
                      <option>--Pilih opsi--</option>
                      <option>1 - Sangat tidak baik</option>
                      <option>2 - Tidak baik</option>
                      <option>3 - Cukup baik</option>
                      <option>4 - Baik</option>
                      <option>5 - Sangat baik</option>
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <button type="submit" className="btn-sm-primary">
                  Simpan
                </button>
                <button type="reset" className="btn-sm-secondary">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kuisioner;
