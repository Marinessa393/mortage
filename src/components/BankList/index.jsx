import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import React from 'react'

const BankList = (props) => {
  const { banks,
    headers,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    openModal, deleteData } = props;
    
  return (
    <>
    <TableContainer align="center" sx={{margin: '0 auto'}} component={Paper}>
      <Table >
        <TableHead>
            <TableRow>
              <TableCell>
              №
            </TableCell>
          {headers.map(({ id, name }) => (
            <TableCell key={id}>{name}</TableCell>))}
            <TableCell align="center">
              Actions
            </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {banks?.length > 0 ? banks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((el, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
              <TableRow key={el?.id} hover tabIndex={-1}>
                <TableCell id={labelId}>{index + 1}</TableCell>
                <TableCell>{el?.title}</TableCell>
                <TableCell>{el?.rate}</TableCell>
                <TableCell>{el?.maxLoan}</TableCell>
                <TableCell>{el?.payment}</TableCell>
                <TableCell>{el?.term}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex' }}>
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => openModal(el)}><Edit /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small"onClick={() => deleteData(el?.id)}><Delete /></IconButton></Tooltip>
                  </div>
                </TableCell>
              </TableRow>
              )
            }) : <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="h5">No information yet</Typography>
                </TableCell>
            </TableRow>}
        </TableBody>
        
      </Table>
        {banks?.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={banks?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </TableContainer>
    </>
  )
}

export default BankList
