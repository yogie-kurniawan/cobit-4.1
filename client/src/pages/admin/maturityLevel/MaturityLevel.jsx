import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMaturityLevels } from "../../../features/admin/maturityLevelSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaturityLevel = () => {
  const dispatch = useDispatch();
  const maturityLevels = useSelector(
    (state) => state.maturityLevels.maturityLevels.maturityLevels
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getMaturityLevels());
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
      selector: (row) => row.user.username,
      width: "100px",
    },
    {
      name: "Pertanyaan",
      selector: (row) => row.pertanyaan.pertanyaan,
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
      <SectionTitle title="Pertanyaan"></SectionTitle>
      <Box>
        <div>
          <DataTable
            columns={columns}
            data={answers}
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
          {/* <ToastContainer /> */}
        </div>
      </Box>
    </Section>
  );
};

export default MaturityLevel;
