import { useEffect, useState } from "react";
import useStore from "../store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AccessControl } from "../AccessControl";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";

function Studies() {
  const { getAllStudy, studys, studyLoading, studyError } = useStore();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const fetchStudies = async () => {
      await getAllStudy(); // This updates the store state
    };
    fetchStudies();
  }, [getAllStudy]);

  function togglePop() {
    setSeen(!seen);
  }

  return (
    <div className="shadow-lg rounded-2xl flex flex-col justify-center items-center px-6 py-7 bg-white  gap-5">
      <section className="flex justify-between w-full">
        <h1 className="text-2xl font-light">Studies</h1>
        <AccessControl
          entity="study"
          permissions={["update"]}
          jsx={
            <Button variant="contained" onClick={togglePop}>
              Add
            </Button>
          }
        />
      </section>
      {studyLoading && <p>Loading...</p>}
      {studyError && <p>Error: {studyError}</p>}
      <TableContainer component={Paper} className="">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Study ID</TableCell>
              <TableCell align="left">Study&nbsp;Name</TableCell>
              <TableCell align="left">Patient&nbsp;Name</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studys ? (
              studys.map((row) => (
                <TableRow
                  key={row.id} // Ensure this key is unique
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.patientName}</TableCell>

                  <TableCell align="left">
                    {
                      <>
                        <AccessControl
                          entity="study"
                          jsx={<VisibilityIcon />}
                          permissions={["view"]}
                        />
                        <AccessControl
                          entity="study"
                          jsx={<DeleteIcon />}
                          permissions={["delete"]}
                        />
                      </>
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Studies;
