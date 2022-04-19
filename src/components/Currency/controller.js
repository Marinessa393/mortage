import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CurrencyExchange from '.';

const CurrencyController = () => {
  const [currency, setCurrency] = useState();

  useEffect(() => {
    const getExchange = async () => {
      await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').then(d => setCurrency(d.data));
    }
    getExchange()
  }, [])
  
  return (
    <div>
      <CurrencyExchange currency={currency}/>
    </div>
  )
}

export default CurrencyController
