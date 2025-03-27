import '@/App.css'
import '@/css/header.css'
import '@/css/stylename.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import IndexPage from '@/pages/IndexPage'
import AppContext, { AppContextParams } from '@/contexts/AppContext'
import { Alerts } from '@/components/common/Alerts';
import { useState } from 'react';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RecoveryPage } from './pages/auth/RecoveryPage';
import { RecoveryPageHard } from './pages/auth/RecoveryPageHard';
import { RegisterPageHard } from './pages/auth/RegPageHard';
import { ProductInfoPage } from './pages/content/ProductInfoPage';
import OfertaPage from './pages/common/OfertaPage';

function App() {
  let initialTheme = localStorage.getItem('theme')
  const [isDarkTheme, setIsDarkTheme] = useState(initialTheme === "dark");

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);

    if (isDarkTheme) {
      localStorage.setItem("theme", "light")
    } else {
      localStorage.setItem("theme", "dark")
    }
  };

  const contextValue: AppContextParams = {
    isDarkTheme,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Alerts />
        <Routes>
          <Route
            path='/catalog'
            element={<IndexPage/>}
          />
          <Route
            path='/catalog/:productID'
            element={<ProductInfoPage/>}
          />
          <Route
            path='/register'
            element={<RegisterPage />}
          />
          <Route
            path='/register/verify'
            element={<RegisterPageHard />}
          />
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/recovery'
            element={<RecoveryPage />}
          />
          <Route
            path='/recovery/verify'
            element={<RecoveryPageHard />}
          />
          <Route
            path='/oferta'
            element={<OfertaPage />}
          />
          <Route path="/" element={<Navigate to='/catalog' />} />
          <Route path="*" element={<Navigate to='/catalog' />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
