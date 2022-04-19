import React, { useEffect, useState } from 'react'
import CalcPanel from '.';
import { getAllItems } from '../../services/firebase';

const CalcController = () => {
  const [banks, setBanks] = useState([]);
  const [loan, setLoan] = useState(0);
  const [payment, setPayment] = useState(0);
  const [bank, setBank] = useState('');
  const [error, setError] = useState([]);
  const [res, setRes] = useState();


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
await getAllItems().then(d => setBanks(d));
  }
  
    const resetSettings = () => {
    setLoan(0);
    setPayment(0);
    setBank({});
  }

  
  const calc = () => {
    setError([]);
    const paymentPercent = 100 / loan * payment;
    const case1 = paymentPercent < +bank.payment;
    const case2 = loan > +bank.maxLoan;
    const case3 = loan < payment;
    
    if (case1 || case2 || case3) {
      const arr = [];
      if (case1) arr.push('Set payment is lower than the payment percent of chosen bank');
      if (case2) arr.push('Set loan is higher than max loan of chosen bank');
      if (case3) arr.push('Loan might be higher than payment');
      setError(arr);
      return;
    } else {
      const step1 = (loan - payment) * (+bank.rate / 12);
      const step2 = Math.pow((1 + bank.rate / 12), +bank.term);
      const step3 = step2 - 1;
      const step4 = step1 * step2 / step3;
      setRes(formatResult(step4));
    }
  }

  const formatResult = (num) => {
    return Math.round(num * 100) / 100;
  }

  const enable = loan !== 0 && payment !== 0 && bank;



  return (
    <>
      <CalcPanel
        banks={banks}
        loan={loan}
        setLoan={setLoan}
        payment={payment}
        setPayment={setPayment}
        calc={calc}
        formatResult={formatResult}
        enable={enable}
        bank={bank}
        error={error}
        res={res}
        resetSettings={resetSettings}
        setBank={setBank}/>
    </>
  )
}

export default CalcController
