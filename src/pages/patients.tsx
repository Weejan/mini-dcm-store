import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useStore from "../store";
import { AccessControl } from "../AccessControl";
import { EditNotifications } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

function Patients() {
  const { allPatient, patientError, patientLoading } = useStore();
  return (
    <div className="shadow-lg rounded-2xl flex flex-col justify-center items-center px-6 py-7 bg-white  gap-8 w-full  overflow-y-auto">
      <section className="flex justify-between w-full">
        <h1 className="text-2xl font-light">Recent Patients</h1>
      </section>
      {patientLoading && <p>Loading...</p>}
      {patientError && <p>Error: {patientError}</p>}
      <TableContainer component={Paper} className="">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell align="left">Patient&nbsp;Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPatient ? (
              allPatient.map((patient) => (
                <TableRow
                  key={patient.id} // Ensure this key is unique
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {patient.id}
                  </TableCell>
                  <TableCell align="left">{patient.name}</TableCell>
                  <TableCell align="left">{patient.age}</TableCell>
                  <TableCell align="left">{patient.gender}</TableCell>

                  <TableCell align="left">{patient.address}</TableCell>
                  <TableCell align="left">{patient.contact}</TableCell>

                  <TableCell align="left">
                    {
                      <>
                        <AccessControl
                          entity="study"
                          jsx={<EditNotifications />}
                          permissions={["update"]}
                        />
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

export default Patients;