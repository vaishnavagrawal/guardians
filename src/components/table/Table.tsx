import React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useHospitals } from '../../hooks/useHospitals';
import { date } from 'zod';
  
function Table() {

    const { status, data : hospitals , error, isFetching } = useHospitals();


    console.log(hospitals)

  return (
    <div>Table</div>
  )
}

export default Table