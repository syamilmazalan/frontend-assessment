import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const TableFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className='form-group'>
      <input
        type='text'
        value={value || ""}
        onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value)
        }}
        name='global_filter'
        id='global_filter'
        className='form-control'
        placeholder='Search...'
      />
    </div>
  );
};

export default TableFilter;
