import React, { useState, useEffect } from "react";
import Section from "../../components/admin/Section";
import SectionTitle from "../../components/admin/SectionTitle";
import Box from "../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestions } from "../../features/admin/questions/questionSlice";
import DataTable from "react-data-table-component"
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const Question = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions.questions);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1, // Generates row numbers
      width: "100px",
    },
    {
      name: "Proses",
      selector: (row) => row.proses.nama,
      width: "100px",
    },
    {
      name: "Pertanyaan",
      selector: (row) => row.pertanyaan,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link
            
          >
            <FaPenNib size={15} className="text-green-500"/>
          </Link>
          <button
            onClick={() => dispatch(deleteQuestion(row._id))}
          >
            <FaTrashCan size={15} className="text-red-500"/>
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="Pertanyaan"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <Link to="/admin/questions/add" className="btn-sm-primary">
              Tambah
            </Link>
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={questions}
            pagination
            paginationPerPage={rowsPerPage}
          />
        </div>
      </Box>
    </Section>
  );
};

export default Question;
