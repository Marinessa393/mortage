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
      setError([]);
      setRes();

  }

  const handleSetLoan = (e) => {
    setLoan(+e.target.value);
  }

  const handleSetpayment = (e) => {
    setPayment(+e.target.value);
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
      const rate = Number(bank?.rate) / 12 / 100;
      const step1 = Math.pow((rate + 1), Number(bank?.term));
      const step2 = step1 - 1;
      const step3 = rate * step1 / step2;
      const step4 = (loan - payment) * step3;
      setRes(formatResult(step4));
    }
  }

  const formatResult = (num) => {
    return Math.round(num * 100) / 100;
  }

  const formatLoan = String(loan).replace(/^0+/, "");
  const formatPayment = String(payment).replace(/^0+/, "");

  const enable = loan !== 0 && payment !== 0 && bank;



  return (
    <>
      <CalcPanel
        banks={banks}
        loan={formatLoan}
        setLoan={handleSetLoan}
        payment={formatPayment}
        setPayment={handleSetpayment}
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
