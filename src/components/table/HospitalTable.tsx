import { Table } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';

import { useUpdateAtom } from 'jotai/utils';
import { useEffect, useState } from 'react';
import { columnsConfigSchema } from '../../schemas/column';
import {
  cityStrAtom,
  hospitalAtom,
  hosStrAtom,
  selectedHospitalAtom,
} from '../../store/store.atom';

function HospitalTable() {
  const hospitalsAtomValue = useAtomValue(hospitalAtom);

  const setSelectedHospital = useUpdateAtom(selectedHospitalAtom);

  const [hosStr] = useAtom(hosStrAtom);
  const [cityStr] = useAtom(cityStrAtom);
  const [hospitals, setHospitals] = useState(hospitalsAtomValue);

  const tableColumns = Object.keys(columnsConfigSchema.shape).map((col) => ({
    key: col,
    label: col,
  }));

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

  return (
    <Table
      aria-label='Hospital Table'
      css={{
        minWidth: '500px',
      }}
      selectionMode='single'
      bordered
      onSelectionChange={(keys) => {
        console.log('keys', parseInt(Object.entries(keys)[0][1]));
        setSelectedHospital(Object.entries(keys)[0][1]);
      }}
    >
      <Table.Header columns={tableColumns}>
        {(column) => (
          <Table.Column
            key={column.key}
            allowsSorting={
              column.label == 'Name' || column.label == 'Area' ? true : false
            }
          >
            {column.label}
          </Table.Column>
        )}
      </Table.Header>

      <Table.Body items={hospitals}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey: any) => (
              <Table.Cell
                css={{
                  paddingX: '10px',
                  textAlign: 'start',
                  maxWidth: '200px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item[columnKey]}
              </Table.Cell>
            )}
          </Table.Row>
        )}
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
