/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: { Authorization: 'whatever-you-want' },
          params: { startIndex, maxResults },
        });
        setBooks(prevBooks => [...prevBooks, ...response.data.books]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [startIndex, maxResults]);

  const handleLoadMore = () => {
    setStartIndex(prevStartIndex => prevStartIndex + maxResults);
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const filteredBooks = searchQuery
    ? books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

    const generateRandomRating = () => {
      return Math.floor(Math.random() * 5) + 1;
    };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="books-container">
        {books.map(book => (
          <div
            key={book.id}
            className={`book ${searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : ''}`}
            /* Manage hiding books which doesn't meet search criteria */
          >
            <img src={book.imageLinks.thumbnail} alt={book.title || 'Book cover'} />
            <div className="book-details">
              <h2>{book.title}</h2>
              <p>{book.authors && book.authors.join(', ')}</p>
              <br></br>
              <p>Rating: {generateRandomRating()}{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 -3 24 24"
                  fill="solid"
                  stroke="none"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.05L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg></p>
              <p>Price: Free</p> {/* Added Price: Free */}
            </div>
          </div>
        ))}
      </div>
      {books.length !== filteredBooks.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default BookList;
