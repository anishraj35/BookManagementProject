import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddBookPage from './pages/AddBookPage'
import BookDetailPage from './pages/BookDetailPage'

export default function App () {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
