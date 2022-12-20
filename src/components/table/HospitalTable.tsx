import { Table } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';

import {
  createColumnHelper,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useMemo, useState } from 'react';
import Hospitals from '../../db/api';
import { ColumnsConfig, columnsConfigSchema } from '../../schemas/column';
import {
  cityStrAtom,
  hospitalAtom,
  hosStrAtom,
  selectedHospitalAtom,
} from '../../store/store.atom';
import { useUpdateAtom } from 'jotai/utils';

// const Columns = ['Name', 'Address', 'Lat', 'Lan', 'Area', 'Type'];

function HospitalTable() {
  const hospitalsAtomValue = useAtomValue(hospitalAtom);

  const setSelectedHospital = useUpdateAtom(selectedHospitalAtom);

  const [hosStr] = useAtom(hosStrAtom);
  const [cityStr] = useAtom(cityStrAtom);
  const [hospitals, setHospitals] = useState(hospitalsAtomValue);
  const tableColumns = Object.keys(columnsConfigSchema).map((col) => ({
    key: col,
    label: col,
  }));

  const tableRows = useState(
      hospitalsAtomValue.map((hos) => {
        const { Id: Key, ...rest } = hos;
        return {
          ...rest,
          Key: Key,
        };
      })
    );


  useEffect(() => {
    setHospitals(
      hospitalsAtomValue.filter((hos) =>
        hos.Name.toLowerCase().includes(hosStr.toLowerCase())
      )
    );
  }, [hosStr]);
  useEffect(() => {
    setHospitals(
      hospitalsAtomValue.filter((hos) =>
        hos.Area.toLowerCase().includes(cityStr.toLowerCase())
      )
    );
  }, [cityStr]);

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

  console.log('tableRows', tableRows);

  return (
    <Table
      aria-label='Example table with static content'
      css={{
        // height: 'auto',
        minWidth: '500px',
      }}
      selectionMode='single'
      bordered
      onSelectionChange={(keys) => {
        console.log('keys', parseInt(Object.entries(keys)[0][1]));
        setSelectedHospital(Object.entries(keys)[0][1]);
      }}
    >
      <Table.Header>
        {table.getHeaderGroups()[0].headers.map((header) => {
          // return <div>{header.column.columnDef.header}</div>;
          return (
            <Table.Column>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Table.Column>
          );
        })}
      </Table.Header>
      <Table.Body>
        {Object.values(hospitals).map((hospital, i) => {
          return (
            <Table.Row key={hospital.Id}>
              {Object.keys(hospital).map((key) => {
                return (
                  <Table.Cell
                    key={hospital.Id}
                    css={{
                      paddingX: '10px',
                      textAlign: 'start',
                      maxWidth: '200px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {hospital[key as keyof typeof hospital]}
                  </Table.Cell>
                );
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
}

export default HospitalTable;
