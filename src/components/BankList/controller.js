import React, { useEffect, useState } from 'react'
import BankList from '.';
import ModalController from '../Modal/controller';
import AddBankBtn from '../AddBankBtn'
import { deleteItem, getAllItems } from '../../services/firebase';

const headers = [
  { id: 'title', name: 'Name' },
  { id: 'rate', name: 'Percentage Rate (%)' },
  { id: 'maxLoan', name: 'Maximum Loan' },
  { id: 'payment', name: 'First Payment (%)' },
  { id: 'term', name: 'Maximum Term (months)' }
]

const initData = {
  id: '',
  title: '',
  rate: '0',
  payment: '0',
  maxLoan: '0',
  term: '0'
}

const BankListController = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initData);
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (!open) {
      getData();
    }
  }, [open])


  const getData = async () => {
    await getAllItems().then(d => setArray(d));
  }

  const openModal = async(d) => {
    setData(d);
    await setOpen(true);
  }

  const closeModal = () => {
    setData(initData);
    setOpen(false);
  }
  

  const deleteData = (id) => {
    deleteItem(id);
    getData();
  }

    const changeData = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value})
  }



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <BankList
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        page={page}
        headers={headers}
        banks={array}
        openModal={openModal}
        deleteData={deleteData}
        />
      <AddBankBtn initData={initData}
        openModal={openModal} />
      <ModalController obj={data}
        closeModal={closeModal}
        open={open}
        changeData={changeData}/>
      </>
  )
}

export default BankListController
