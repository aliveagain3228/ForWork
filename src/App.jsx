import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import LibraryPage from './pages/LibraryPage'
import CalculatorPage from './pages/CalculatorPage'
import ConstructorPage from './pages/ConstructorPage.jsx'

export default function  App() {

  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<LibraryPage /> } />
              <Route path="/calculator" element={<CalculatorPage /> } />
              <Route path="/constructor" element={<ConstructorPage /> } />
              <Route path="/constructor/:id" element={<ConstructorPage /> } />
          </Routes>
      </BrowserRouter>
  )
}
