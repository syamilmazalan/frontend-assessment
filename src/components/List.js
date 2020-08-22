import React, { useEffect } from "react";
import Table from "./Table";

const List = ({
  loading,
  isError,
  data,
  fetchPosts,
  setRow,
  page,
  setPage,
  totalPages
}) => {
  useEffect(() => {
    if (loading) {
      fetchPosts();
    }
  }, [loading, fetchPosts, page]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
      },
    ],
    []
  );

  return (
    <div>
      <h3 className='mb-4'>List</h3>

      {isError && <p>Something went wrong ...</p>}

      {loading ? (
        <p>Loading please wait...</p>
      ) : (
        <Table
          columns={columns}
          data={data}
          setRow={setRow}
          fetchPosts={fetchPosts}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default List;
