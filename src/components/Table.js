import React from "react";
import { useTable } from "react-table";

import "./Table.css";

const Table = ({
  columns,
  data,
  setRow,
  fetchPosts,
  page,
  setPage,
  totalPages,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data,
  });

  const clickHandler = (row) => {
    setRow(row);
  };

  const firstBtnHandler = () => {
    setPage(1);
    fetchPosts();
  };

  const lastBtnHandler = () => {
    setPage(totalPages);
    fetchPosts();
  };

  const pageBtnHandler = (e) => {
    setPage(e.target.value);
    fetchPosts();
  }

  return (
    <>
      <table
        className='table table-dark table-hover table-responsive'
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => clickHandler(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className={page === 1 ? 'page-item disabled' : 'page-item'}>
            <button className='page-link' onClick={firstBtnHandler}>
              {"<<"}
            </button>
          </li>
          {page !== 1 && (
            <>
              <li className='page-item disabled'>
                <button className='page-link'>...</button>
              </li>
              <li className='page-item'>
                <button className='page-link' value={+page - 1} onClick={pageBtnHandler}>{+page - 1}</button>
              </li>
            </>
          )}
          <li className='page-item disabled'>
            <button className='page-link' value={page}>{page}</button>
          </li>

          {page !== totalPages && (
            <>
              <li className='page-item'>
                <button className='page-link' value={+page + 1} onClick={pageBtnHandler}>{+page + 1}</button>
              </li>
              <li className='page-item disabled'>
                <button className='page-link'>...</button>
              </li>
            </>
          )}
          <li className='page-item'>
            <button className='page-link' onClick={lastBtnHandler}>
              {">>"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Table;
