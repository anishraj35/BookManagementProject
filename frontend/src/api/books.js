import api from './axios'

export const getBooks = (page = 0, size = 10, sort = 'title,asc') =>
  api.get('/api/books', { params: { page, size, sort } })

export const getBook = id => api.get(`/api/books/${id}`)

export const addBook = data => api.post('/api/books', data)

export const deleteBook = id => api.delete(`/api/books/${id}`)

export const googleDetails = isbn =>
  api.get(`/api/books/details/${isbn}`)
