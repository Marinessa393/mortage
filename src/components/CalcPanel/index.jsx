import { Grid, Paper, Select, TextField, Typography, MenuItem, Button } from '@mui/material'
import React from 'react'
import './style.scss'

const CalcPanel = (props) => {
  const { loan,
    banks,
    setLoan,
    payment,
    setPayment,
    calc,
    formatResult,
    enable,
    bank,
    error,
    res,
    resetSettings,
    setBank
  } = props;

  return (
    <>
    <Paper sx={{padding: ' 32px 15px'}}>
      <Grid container spacing={2}>
        <Grid item container xs={6} justifyContent="flex-start" >
          <Typography variant="h6" component="span">Enter Initial Loan:</Typography>
          <TextField
              name="loan"
              value={loan}
              type="number"
              variant="outlined"
              onChange={e => setLoan(+e.target.value)}
              color="warning"
              fullWidth
              error={loan < 1}
              helperText={'Value can\'t be 0'}
              inputProps={{min: '1'}}/>
        </Grid>
        <Grid item container xs={6} justifyContent="flex-start">
          <Typography variant="h6" component="p">Enter Down Payment:</Typography>
          <TextField
              name="payment"
              value={payment}
              type="number"
              variant="outlined"
              onChange={e => setPayment(+e.target.value)}
              color="warning"
              fullWidth
              error={payment < 1}
              helperText={'Value can\'t be 0 '}
              inputProps={{min: '1'}}/>
        </Grid>
        <Grid item container xs={12} alignItems="baseline" spacing={2}>
          <Grid item container xs={6} justifyContent="flex-start">
            <Typography variant="h6" component="p">Select Bank:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bank}
              label="Bank"
              onChange={(e) => setBank(e.target.value)}
              color="warning"
                fullWidth>
              {banks?.map(el => <MenuItem value={el} key={el.id}>{el.title}</MenuItem>)}
            </Select>
          </Grid>
          <Grid item container xs={6} spacing={2}>
            <Grid item xs={12}>
              <Button color="warning" fullWidth variant="contained" disabled={!enable} onClick={() => calc()}>Calculate</Button>
            </Grid>
            <Grid item xs={12}>
              <Button color="secondary" fullWidth variant="contained" disabled={!enable} onClick={() => resetSettings()}>Reset</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      </Paper>
    {error?.length > 0 &&
        <Paper sx={{marginTop: '20px', padding: '15px 10px'}}>
        {error.map(e => <Typography color="error" variant="h6">{e}</Typography>)}
        </Paper>}
      {res && res > 0 && <Paper sx={{ marginTop: '20px', padding: '15px 10px' }}>
        <Typography variant="h6" component="p">Your monthly payment is {formatResult(res / bank?.term)}</Typography>
        <Typography variant="h6" component="p" color="success">Total payment: {res}</Typography>
      </Paper>}
    </>
  )
}

export default CalcPanel
