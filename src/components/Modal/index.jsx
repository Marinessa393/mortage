import { Close } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react';
import { addNewItem, changeItem } from '../../services/firebase';

const Modal = ({ open, data, closeModal, changeData, disabled }) => {

  const saveData = (d) => {
    if (d.id === '') {
      addNewItem(d);
      closeModal()
    } else {
      const id = d.id;
      changeItem(id, d);
      closeModal();
    }
  }

  return (
    <>
      {open && data !== {} && <div className="backdrop">
      <div className="modal">
          <Grid container justifyContent="flex-end" rowSpacing={3}>
            <Grid item justifySelf="flex-end">
        <IconButton size="small" color="warning" onClick={() => closeModal()} >
          <Close/>
        </IconButton>
            </Grid>
            <Grid item xs={12} justifySelf="center" sx={{paddingTop: '0 !important'}}>
              <Typography variant="h6" component="p">{data.id === '' ? 'Add new bank' : 'Change bank data'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="title"
                value={data.title}
                label="Bank name"
                onChange={changeData}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth/>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  name="rate"
                  value={data.rate}
                  label="Percentage rate, %"
                  onChange={changeData}
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="payment"
                  value={data.payment}
                  label="First payment, %"
                  color="primary"
                  type="number"
                  onChange={changeData}
                  variant="outlined"
                  fullWidth
                  size="small" />
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="maxLoan"
                  value={data.maxLoan}
                  label="Max loan"
                  color="primary"
                  type="number"
                  onChange={changeData}
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="term"
                  value={data.term}
                  label="Term, months"
                  color="primary"
                  type="number"
                  onChange={changeData}
                  variant="outlined"
                  fullWidth
                  size="small" />
                </Grid>
            </Grid>
            <Grid item container xs={12} columnSpacing={1}>
              <Grid item xs={6}>
                <Button variant="contained" color="warning" fullWidth disabled={disabled} onClick={() => saveData(data)}>Save</Button>
              </Grid>
              <Grid item xs={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => closeModal()}>Cancel</Button>
              </Grid>
            </Grid>

          </Grid>
      </div>
        </div>}
    </>
  )
}

export default Modal
 