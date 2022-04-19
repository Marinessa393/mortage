import { Grid } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router';
import './App.scss';
import CurrencyController from './components/Currency/controller';
import Header from './components/Header';
import CalcPage from './pages/CalcPage.view';
import MainPage from './pages/MainPage.view';
import { NotificationContainer } from 'react-notifications';

function App() {
  const isDayNight = document.body.classList.value === 'light';
  const loc = useLocation().pathname;

  return (
    <>
      <Header isLight={isDayNight}/>
      <div className="App">
        <div className="container">
          <h1 className="title">{loc === '/' ? 'Main Page' : 'Calculation Page'}</h1>
          <Grid container rowGap={4} columnSpacing={3}>
            <Grid item xs={12} lg={3}>
              <CurrencyController/>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Routes>
                <Route path="/" exact element={<MainPage/>} />
                <Route path="/calc" exact element={<CalcPage/>} />
              </Routes>
            </Grid>
          </Grid>
        </div>
        <NotificationContainer/>
        </div>
      </>
  );
}

export default App;
