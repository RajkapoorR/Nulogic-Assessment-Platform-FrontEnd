import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssignSpecificTaskForm from "./form/AssignSpecificTaskForm";

export default function Search() {
  const [userData, setUserData] = useState([]);
  const [specificUserData, setSpecificUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/rest/v1/user/get-all-user`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data?.state);
      setTotalPages(Math.ceil(data?.state.length / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setTotalPages(Math.ceil(userData.length / parseInt(event.target.value, 10)));
  };

  const onAssignTask = () =>{
    
  }


  const filterByEmail = (data) => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      row.email.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  };

  const slicedData = () => {
    const filteredData = filterByEmail(userData);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <TextField sx={{ marginTop: 10 }} 
          label="Search Email"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <TableContainer sx={{ marginTop: 5 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>FIRST NAME</TableCell>
              <TableCell>LAST NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>WORKING DOMAINS</TableCell>
              <TableCell>USER ROLE</TableCell>
              <TableCell>TASK ASSIGNING</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData().map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.workingDomains ? row.workingDomains.join(", ") : "N/A"}
                </TableCell>
                <TableCell>{row.userRole}</TableCell>
                <TableCell>
                  <AssignSpecificTaskForm email={row.email}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalPages={totalPages}
        nextIconButtonProps={{
          disabled: page === totalPages - 1 || totalPages === 0,
        }}
      />
    </>
  );
}
