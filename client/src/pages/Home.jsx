import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import Spinner from "../components/Loading";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  const updateCopies = (id, change) => {
    axios
        .patch(`http://localhost:5555/books/${id}/copies`, { copies: change })
        .then((res) => {
        
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book._id === id ? { ...book, copies: res.data.book.copies } : book
                )
            );
        })
        .catch((err) => console.error("Error updating copies:", err));
};


  return (
    <div className="p-6 flex flex-col items-center bg-[#fcf5e5] min-h-screen">
      <div className="flex justify-between w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-[#5a4638]">📚 Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-[#a67c52] hover:text-[#5a4638] transition" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-4xl mt-6">
          <table className="w-full text-left bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-[#d3a673] text-white text-lg">
                <th className="p-3 text-center">No</th>
                <th className="p-3 text-center">Title</th>
                <th className="p-3 text-center max-md:hidden">Author</th>
                <th className="p-3 text-center max-md:hidden">Publish Year</th>
                <th className="p-3 text-center">Copies</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="border-t text-gray-700">
                  <td className="p-3 text-center align-middle">{index + 1}</td>
                  <td className="p-3 text-center align-middle">{book.title}</td>
                  <td className="p-3 text-center align-middle max-md:hidden">{book.author}</td>
                  <td className="p-3 text-center align-middle max-md:hidden">{book.publishYear}</td>

                  <td className="p-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateCopies(book._id, -1)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                      >
                        <FaMinus />
                      </button>
                      <span className="font-semibold text-sm">{book.copies}</span>
                      <button
                        onClick={() => updateCopies(book._id, 1)}
                        className="px-2 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-700 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>

                  {/* Action Buttons - Now correctly aligned */}
                  <td className="p-3 text-center align-middle">
                    <div className="flex justify-center items-center gap-3">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-xl text-green-700 hover:text-green-500" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-500" />
                      </Link>
                      <Link to={`/book/delete/${book._id}`}>
                        <MdOutlineDelete className="text-xl text-red-600 hover:text-red-500" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export {Home};