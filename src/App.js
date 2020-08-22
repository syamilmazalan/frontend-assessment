import React, { useState } from "react";
import Details from "./components/Details";
import List from "./components/List";
import axios from "axios";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [row, setRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
   
  const fetchPosts = async () => {
    setIsError(false);
    setLoading(true);
    
    await axios
      .get(`https://gorest.co.in/public-api/posts?page=${page}`)
      .then((response) => {

        const formatDate = (date) => (
            new Date(date).toLocaleString()
        )

        const posts = response.data.data.map((post) => ({
             ...post,
             created_at: formatDate(post.created_at),
             updated_at: formatDate(post.updated_at)
        }))

        setData(posts);
        setTotalPages(response.data.meta.pagination.pages);
        setLoading(false);
      })
      .catch((error) => {
        setIsError(true);
      });
      
    setLoading(false);
  };


  return (
    <div className='app'>
      <div className='container'>
        <div className='row'>
          <div className='col mt-5'>
            <h1>Front-end CRUD App</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mt-5'>
            <Details fetchPosts={fetchPosts} row={row} setRow={setRow} />
          </div>
          <div className='col-md-6 mt-5'>
            <List
              data={data}
              isError={isError}
              loading={loading}
              fetchPosts={fetchPosts}
              setRow={setRow}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
