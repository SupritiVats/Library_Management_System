import React, { useState, useEffect } from 'react';
import { data } from '../data'
import bookimg from '../assests/book_cover.jpeg';
import '../css/LibraryManagementPage.css'

const BOOKS_PER_PAGE = 10; // Number of books to display per page

function LibraryManagementPage() {
    const [books, setBooks] = useState([]); // Array to store the list of books

    const [filteredBooks, setFilteredBooks] = useState([]); // Array to store the filtered list of books

    const [currentPage, setCurrentPage] = useState(1); // Current page number

    const [filter, setFilter] = useState({
        title: '',
        author: '',
        subject: '',
        publish_date: '',
    }); // Filter criteria

    // Load the list of books (dummy data for demonstration)
    useEffect(() => {
        setBooks(data);
    }, []);

    // Handle filter criteria change
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    // // Apply filters to the list of books
    useEffect(() => {
        const filtered = books.filter((book) => {
            const titleMatch = book.title.toLowerCase().includes(filter.title.toLowerCase());
            const authorMatch = book.author.toLowerCase().includes(filter.author.toLowerCase());
            const subjectMatch = book.subject.toLowerCase().includes(filter.subject.toLowerCase());
            const publish_dateMatch = book.publish_date.includes(filter.publish_date);

            return titleMatch && authorMatch && subjectMatch && publish_dateMatch;
        });

        setFilteredBooks(filtered);
        setCurrentPage(1); // Reset to the first page when filters change
    }, [books, filter]);




    // Pagination logic
    const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Change the current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const inputfieldstyle = {
        borderRadius: '10px',
        width: '200px',
        height: '30px',
    }

    return (
        <div>

            <div>
                <img src={"https://www.lmscert.com/Logo%20LMS%20-1-.svg"} alt="" style={{
                    width: '100px',
                    height: '90px'
                }} />
                <h1 className='page-title' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop:'-87px',
                    fontFamily:'georgia,  serif',
                    textDecoration: 'underline',
                }}><h4><b>LIBRARY MANAGEMENT SYSTEM</b></h4></h1><br></br>
            </div>

            <h4 style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <b>Search By -</b> <br/>
            </h4>


            {/* Filter inputs */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
            }}>
                <input type="text" name="title" placeholder="Title" value={filter.title} onChange={handleFilterChange} style={inputfieldstyle} />
                <input type="text" name="author" placeholder="Author" value={filter.author} onChange={handleFilterChange} style={inputfieldstyle} />
                <input type="text" name="subject" placeholder="Subject" value={filter.subject} onChange={handleFilterChange} style={inputfieldstyle} />
                <input type="text" name="publish_date" placeholder="Publish Date" value={filter.publish_date} onChange={handleFilterChange} style={inputfieldstyle} />
            </div>
            <br /><br /> <br />
            <hr />

            <br />
            {/* Book count based on filter criteria */}


            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <p><b>Total Books</b>: {filteredBooks.length}</p>
                <p><b>Books matching Title</b>: {filteredBooks.filter((book) => book.title.toLowerCase().includes(filter.title.toLowerCase())).length}</p>
                <p><b>Books matching Author</b>: {filteredBooks.filter((book) => book.author.toLowerCase().includes(filter.author.toLowerCase())).length}</p>
                <p><b>Books matching Subject</b>: {filteredBooks.filter((book) => book.subject.toLowerCase().includes(filter.subject.toLowerCase())).length}</p>
                <p><b>Books matching Publish Date</b>: {filteredBooks.filter((book) => book.publish_date.includes(filter.publish_date)).length}</p>
            </div>

            <br /><hr /><br />

            {/* Book list */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
            }}>
                {currentBooks.map((book) => (
                    <div key={book.id} style={{
                        border: '2px solid black',
                        borderRadius: '20px',
                        width: '20%',
                        height: '180px',
                        marginBottom: '40px',
                        backgroundColor: '#e6e1e1',
                        padding: '20px'
                    }}>
                        <h3><center>{book.title}</center></h3>
                        <p><b>Author</b>: {book.author}</p>
                        <p><b>Subject</b>: {book.subject}</p>
                        <p><b>Publish Date</b>: {book.publish_date}</p>
                        {/* <div >
                            <img src={bookimg} alt="err" style={{
                                width: '150px',
                                position: 'relative',
                                marginTop: '-160px',
                                marginLeft: '300px',
                                objectFit: 'cover'
                            }} />
                        </div> */}
                    </div>
                ))}
            </div>


            <br /><hr />

            {/* Pagination */}

            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                {filteredBooks.length > BOOKS_PER_PAGE &&
                    Array.from({ length: Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} style={{
                            marginRight: '20px',
                            // padding: '20px',
                        }}>
                            {index + 1}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default LibraryManagementPage;




