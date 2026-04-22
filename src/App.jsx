import { Routes, Route, HashRouter} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import LibraryPage from './pages/LibraryPage'
import CalculatorPage from './pages/CalculatorPage'
import ConstructorPage from './pages/ConstructorPage.jsx'
import PageLoader from "./components/PageLoader/PageLoader.jsx";

export default function  App() {

  return (
      <HashRouter>
          <PageLoader />
          <Header />
          <Routes>
              <Route path="/" element={<LibraryPage /> } />
              <Route path="/calculator" element={<CalculatorPage /> } />
              <Route path="/constructor" element={<ConstructorPage /> } />
              <Route path="/constructor/:id" element={<ConstructorPage /> } />
          </Routes>
      </HashRouter>
  )
}
