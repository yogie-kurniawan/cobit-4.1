import React, { useState, useEffect } from "react";
import Section from "../../../components/admin/Section";
import SectionTitle from "../../../components/admin/SectionTitle";
import Box from "../../../components/admin/Box";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGaps } from "../../../features/admin/gapSlice";
import DataTable from "react-data-table-component";
import { FaPenNib } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dataGaps = [
  {
    proses: "DS1",
    indexSekarang: 4.9,
    indexDiharapkan: 5,
  },
  {
    proses: "DS2",
    indexSekarang: 4.7,
    indexDiharapkan: 5,
  },
  {
    proses: "DS3",
    indexSekarang: 4.6,
    indexDiharapkan: 5,
  },
  {
    proses: "DS4",
    indexSekarang: 4.7,
    indexDiharapkan: 5,
  },
  {
    proses: "DS5",
    indexSekarang: 4.4,
    indexDiharapkan: 5,
  },
  {
    proses: "DS6",
    indexSekarang: 4.9,
    indexDiharapkan: 5,
  },
  {
    proses: "ME1",
    indexSekarang: 4.9,
    indexDiharapkan: 5,
  },
  {
    proses: "ME2",
    indexSekarang: 4.8,
    indexDiharapkan: 5,
  },
  {
    proses: "ME3",
    indexSekarang: 4.6,
    indexDiharapkan: 5,
  },
  {
    proses: "ME4",
    indexSekarang: 4.2,
    indexDiharapkan: 5,
  },
];

const Gap = () => {
  const dispatch = useDispatch();
  // const gaps = useSelector((state) => state.gaps.gaps);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getGaps());
  }, [dispatch]);

  const handleRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
  };

  const totals = dataGaps.reduce(
    (acc, row) => {
      // Hitung gap untuk baris saat ini
      const gap = row.indexDiharapkan - row.indexSekarang;

      // Tambahkan gap ke total
      acc.gap += gap;

      return acc;
    },
    {
      proses: "Total",
      gap: 0,
    }
  );

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1, // Generates row numbers
      width: "100px",
    },
    {
      name: "Index Sekarang",
      selector: (row) => row.indexSekarang,
      width: "200px",
    },
    {
      name: "Index Diharapkan",
      selector: (row) => row.indexDiharapkan,
      width: "200px",
    },
    {
      name: "Gap",
      selector: (row) => (row.indexDiharapkan - row.indexSekarang).toFixed(2),
      width: "200px",
    },
  ];

  return (
    <Section>
      <SectionTitle title="GAP"></SectionTitle>
      <Box>
        <div>
          <DataTable
            columns={columns}
            data={[...dataGaps, totals]}
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

export default Gap;
