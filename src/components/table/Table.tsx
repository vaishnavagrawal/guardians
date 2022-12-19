import React, { useMemo } from 'react'
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useHospitals } from '../../hooks/useHospitals';
import { date } from 'zod';
import { ColumnsConfig } from '../../schemas/column';
import { Table } from "@nextui-org/react";


function TableRender() {

    const { status, data : hospitals , error, isFetching } = useHospitals();
    const columnHelper = createColumnHelper<ColumnsConfig>()

//     const columns : any  = useMemo<ColumnDef<ColumnsConfig, any>[]>(
//         () => 
//         [
//             columnHelper.accessor('name', {
//                 header : 'Name' ,
//               footer: info => info.column,

//             }),
//             columnHelper.accessor(row => row.address, {
//               id: 'lastName',
//               cell: info => <i>{info.getValue()}</i>,
//               header: () => <span>Last Name</span>,
//               footer: info => info.column.id,
//             }),
//             // columnHelper.accessor('age', {
//             //   header: () => 'Age',
//             //   cell: info => info.renderValue(),
//             //   footer: info => info.column.id,
//             // }),
//             // columnHelper.accessor('visits', {
//             //   header: () => <span>Visits</span>,
//             //   footer: info => info.column.id,
//             // }),
//             // columnHelper.accessor('status', {
//             //   header: 'Status',
//             //   footer: info => info.column.id,
//             // }),
//             // columnHelper.accessor('progress', {
//             //   header: 'Profile Progress',
//             //   footer: info => info.column.id,
//             // }),
//           ]
//       ,
//         []
//       )
    
//   const tableData = useReactTable({
//     hospitals  ,
//     columns,
//     // getCoreRowModel: getCoreRowModel(),
//   })

//   console.log('tableData' ,tableData.getHeaderGroups())


  return (
<div>
    Table
</div>


  )
}

export default TableRender