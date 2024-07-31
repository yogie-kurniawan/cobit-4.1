import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import Section from "../../components/admin/Section";
import SectionTitle from "../../components/admin/SectionTitle";
import Box from "../../components/admin/Box";
import LinkButton from "../../components/admin/Link";
const rows = [];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Question = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  return (
    <Section>
      <SectionTitle title="Pertanyaan"></SectionTitle>
      <Box>
        <div className="mb-8">
          <div className="flex">
            <LinkButton
              to="/admin/questions/add"
              text="Tambah"
              variant="primary"
              color="white"
            ></LinkButton>
          </div>
        </div>
        <div>
          <TableContainer component={Paper} className="w-full">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-gray-300">
                  <TableCell className="font-bold">No.</TableCell>
                  <TableCell className="font-bold">Pertanyaan</TableCell>
                  <TableCell className="font-bold">Proses</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[].map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TablePagination
                component="div"
                count={rows.length}
                rowsPerPageOptions={[10, 50]}
                rowsPerPage={rowsPerPage}
              />
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Section>
  );
};

export default Question;
