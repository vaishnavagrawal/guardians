import { Table } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { hospitalAtom, searchAtom } from '../../store/store.atom';
import { useEffect, useState } from 'react';
import { ColumnsConfig } from '../../schemas/column';
import Hospitals from '../../db/api';

const Columns = ['Name', 'Address', 'Lat', 'Lan', 'Area', 'Type'];

function HospitalTable() {
  const hospitalsAtomValue = useAtomValue(hospitalAtom);
  const [searchStr, setSearchStr] = useAtom(searchAtom);
  const [hospitals, setHospitals] = useState(hospitalsAtomValue);

  console.log(hospitals);

  const filterTable = (str: string) => {
    // console.log(hospitals.filter(hos => hos.Name.includes(str)))
    setHospitals(hospitalsAtomValue.filter((hos) => (hos.Name).toLowerCase().includes(str)));
  };
  useEffect(() => {
    filterTable(searchStr);
  }, [searchStr]);

  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
  };

  const defaultData: ColumnsConfig[] = Hospitals;

  const columnHelper = createColumnHelper<ColumnsConfig>();

  const columns = [
    columnHelper.accessor('Id', {
      cell: (info) => info.getValue(),
      header: () => 'Id',
    }),
    columnHelper.accessor('Name', {
      cell: (info) => info.getValue(),
      header: () => 'Name',
    }),
    columnHelper.accessor('Address', {
      cell: (info) => info.getValue(),
      header: () => 'Address',
    }),
    columnHelper.accessor('Lat', {
      cell: (info) => info.getValue(),
      header: () => 'Lat',
    }),
    columnHelper.accessor('Lng', {
      cell: (info) => info.getValue(),
      header: () => 'Lan',
    }),

    columnHelper.accessor('Area', {
      cell: (info) => info.getValue(),
      header: () => 'Area',
    }),

    columnHelper.accessor('Type', {
      cell: (info) => info.getValue(),
      header: () => 'Type',
    }),
  ];

  const table = useReactTable({
    defaultData,
    columns,
    // getCoreRowModel: getCoreRowModel(),
  });

  // console.log('columns', columns);
  console.log(table.getHeaderGroups());
  // console.log('row' , table.getRowModel())
  // useEffect(()=>{

  // } , [table])

  return (
    <Table
      aria-label='Example table with static content'
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
      selectionMode='single'
      bordered
    >
      <Table.Header>
        {table.getHeaderGroups()[0].headers.map((header) => {
          // return <div>{header.column.columnDef.header}</div>;
          return (
            <Table.Column maxWidth={100} css={{
              maxWidth : '100px'
            }}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Table.Column>
          );
        })}

        {/* <Table.Column>ID</Table.Column>
        <Table.Column>NAME</Table.Column>
        <Table.Column>ADDRESS</Table.Column>
        <Table.Column>LAT</Table.Column>
        <Table.Column>LAN</Table.Column>
        <Table.Column>AREA</Table.Column>
        <Table.Column>TYPE</Table.Column> */}
      </Table.Header>

      {/* <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body> */}

      <Table.Body>
        {Object.values(hospitals).map((hospital, i) => {
          return (
            <Table.Row key={i}>
              {Object.keys(hospital).map((key: any) => {
                return <Table.Cell css={{
textAlign : 'start',
// maxWidth : '200px',
// wordBreak : 'break-word'


                }}>{hospital[key]}</Table.Cell>;
              })}
            </Table.Row>
          );
        })}
      </Table.Body>

      <Table.Pagination
        shadow
        noMargin
        align='center'
        rowsPerPage={10}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
  return (
    <div>
      {table.getHeaderGroups()[0].headers.map((header) => {
        // return <div>{header.column.columnDef.header}</div>;
        return flexRender(header.column.columnDef.header, header.getContext());
      })}

      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}

      {/* {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <th key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
          </th>
        ))}
      </tr>
    ))} */}
    </div>
  );
}

export default HospitalTable;
