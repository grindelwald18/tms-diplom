import { IBookInfo } from '../models';

function addBookToLocalStorage(book: IBookInfo) {
  const booksString = localStorage.getItem('books');
  let books = booksString ? JSON.parse(booksString) : [];

  const existingBook = books.find((b: { isbn13: string }) => b.isbn13 === book.isbn13);
  if (existingBook) {
    Object.assign(existingBook, book);
  } else {
    books.push(book);
  }

  try {
    localStorage.setItem('books', JSON.stringify(books));
  } catch (error) {
    console.error('Error saving book to local storage:', error);
  }
}

function deleteBookFromLocalStorage(isbn13: string) {
  const booksString = localStorage.getItem('books');
  const books = booksString ? JSON.parse(booksString) : [];
  const newBooks = books.filter((b: { isbn13: string }) => b.isbn13 !== isbn13);
  try {
    localStorage.setItem('books', JSON.stringify(newBooks));
  } catch (error) {
    console.error('Error deleting book from local storage:', error);
  }
}

function getBooksFromLocalStorage() {
  const booksString = localStorage.getItem('books');
  const books = booksString ? JSON.parse(booksString) : [];
  return books;
}

export { addBookToLocalStorage, deleteBookFromLocalStorage, getBooksFromLocalStorage };
