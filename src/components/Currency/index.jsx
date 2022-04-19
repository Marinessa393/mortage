import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import './style.scss'

const CurrencyExchange = ({currency}) => {
  return (
    <>
        <Typography variant="h5" className='currency_title'>Currency exchange</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="name">Currency</span>
              </TableCell>
              <TableCell>
                <span className="name">Buy</span>
              </TableCell>
              <TableCell>
                <span className="name">Sale</span>
              </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {currency?.map((el, idx) => (
              <TableRow key={idx}>
                <TableCell><span className="currency name">{el.base_ccy} - {el.ccy}</span></TableCell>
                <TableCell ><span className="currency buy">{Math.floor(el.buy * 100) / 100}</span></TableCell>
                <TableCell ><span className="currency sale">{Math.floor(el.sale * 100) / 100}</span></TableCell>
              </TableRow>
          ))}
        </TableBody>
        </Table>
      </>

  )
}

export default CurrencyExchange
