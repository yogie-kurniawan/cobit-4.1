import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../../features/admin/answerSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Question = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answers.answers);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAnswers());
  }, [dispatch]);

  const handleRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1, // Generates row numbers
      width: "100px",
    },
    {
      name: "User",
      selector: (row) => row.user?.nama || "",
      width: "100px",
    },
    {
      name: "Pertanyaan",
      selector: (row) => row.question?.pertanyaan || "",
      width: "300px",
    },
    {
      name: "Nilai",
      selector: (row) => row.nilai,
      width: "300px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="Jawaban"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link
              to="/admin/answers/print"
              target="_blank"
              className="btn-md-secondary"
            >
              Cetak
            </Link>
          </div>
        </div>
        <div>
          <ToastContainer />
          <DataTable
            columns={columns}
            data={answers}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default Question;
