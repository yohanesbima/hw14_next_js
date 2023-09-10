"use client"
import { useEffect, useState } from "react";
import { findBooks, findBookById } from "@/fetching/books";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  const router = useRouter();

  const fetchBooks = async () => {
    const data = await findBooks();
    setBooks(data);
    setLoading(false);
  };

  const handleViewBook = async (id) => {
    try {
      const book = await findBookById(id);
      // Now you have the book details, you can use them as needed
      console.log("Book details:", book);

      // You can navigate to a new page to display book details
      router.push(`/books/${book.id}`);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBooks();
    // Simulate user authentication status (replace with your authentication logic)
    const userIsAuthenticated = true; // Set to true if the user is authenticated
    setIsAuthenticated(userIsAuthenticated);
  }, []);

  const handleSignOut = () => {
    // Clear the accessToken cookie
    Cookies.remove("accessToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search clicked with text:", searchText);

    // Filter books based on the search text
    const filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchText.toLowerCase()) || // Filter by title
        book.id.toString().includes(searchText) // Filter by book ID
      );
    });
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger the search when Enter key is pressed
      handleSearch();
    }
  };

  // Filter books when there is input in the search text, otherwise show all books
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredBooks(books);
    } else {
      handleSearch();
    }
  }, [searchText, books]);

  // Calculate the total number of records
  const totalRecords = filteredBooks.length;

  // Calculate the total number of pages based on itemsPerPage
  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's books
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // If the user is not authenticated, show blank homepage
  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div>
      <nav className="bg-cyan-500 text-white py-4 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <img
              src="/favicon.ico"
              alt="Thinkpad Book"
              className="w-6 h-6 inline-block mr-2"
            />
            Thinkpad Book
          </div>
          <div className="text-right mt-4">
            <button
              onClick={handleSignOut}
              className="text-white hover:underline"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
            </button>
          </div>
        </div>
      </nav>
      <div className="mt-20">
        <div className="flex justify-end sticky top-0 bg-white z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Title or ID"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger search on Enter key press
              className="w-64 px-8 py-1 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSearch} // Trigger search on button click
              className="absolute top-0 right-0 px-3 py-1 bg-cyan-500 text-white rounded-r-lg hover:bg-cyan-600"
            >
              <FontAwesomeIcon icon={faSearch} /> {/* Add the search icon */}
            </button>
          </div>
        </div>

        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-cyan-500 text-white">
              <th className="w-1/12 py-2 text-center">No</th>
              <th className="w-2/12 py-2 text-left">Title</th>
              <th className="w-2/12 py-2 text-left">Author</th>
              <th className="w-2/12 py-2 text-left">Publisher</th>
              <th className="w-1/12 py-2 text-left">Year</th>
              <th className="w-1/12 py-2 text-left">Pages</th>
              <th className="w-2/12 py-2 text-left">Image</th>
              <th className="w-1/12 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => {
              console.log(book); // Add this line to check the book object
              return (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }
                >
                  <td className="py-2 text-center">
                    {index + 1 + startIndex}
                  </td>
                  <td className="py-2">{book.title}</td>
                  <td className="py-2 text-left">{book.author}</td>
                  <td className="py-2 text-left">{book.publisher}</td>
                  <td className="py-2 text-left">{book.year}</td>
                  <td className="py-2 text-left">{book.pages}</td>{" "}
                  {/* Make sure this is correct */}
                  <td className="py-2 text-left">{book.image}</td>
                  <td className="py-2 text-left">
                    <button
                      onClick={() => handleViewBook(book.id)}
                      className="rounded-full bg-cyan-400 px-3 py-1 text-white hover:bg-cyan-600"
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <span className="text-gray-600">
            Showing{" "}
            {currentPage > 1
              ? (currentPage - 1) * itemsPerPage + 1
              : 1}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              totalRecords
            )}{" "}
            of {totalRecords} records
          </span>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-2 border ${currentPage === i + 1
                    ? "bg-cyan-500 text-white"
                    : "bg-white text-cyan-500"
                    }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
