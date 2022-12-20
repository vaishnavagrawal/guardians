import { Table, useCollator } from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { useAsyncList } from 'react-stately';

import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { ColumnsConfig, columnsConfigSchema } from '../../schemas/column';
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

  const tableColumns = Object.keys(columnsConfigSchema.shape).map((col) => ({
    key: col,
    label: col,
  }));

  console.log('tableColumns', tableColumns);
  const collator = useCollator({ numeric: true });

  const load = async () => {
    console.log({ cityStr, hosStr });

    const temp = hospitalsAtomValue.filter((hos) => {
      const t1 = hos.Area.toLowerCase().includes(cityStr.toLowerCase());
      const t2 = hos.Name.toLowerCase().includes(hosStr.toLowerCase());

      if (cityStr && hosStr) {
        return t1 && t2;
      } else if (cityStr || hosStr) {
        if (cityStr) return t1;
        if (hosStr) return t2;
      } else {
        return true;
      }
    });

    return {
      items: temp,
    };
  };

  async function sort({
    items,
    sortDescriptor,
  }: {
    items: ColumnsConfig[];
    sortDescriptor: any;
  }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === 'descending') {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  const list = useAsyncList({ load, sort });

  // console.log('list', list);
  useEffect(() => {
    list.setFilterText(hosStr + cityStr);
  }, [hosStr, cityStr]);

  return (
    <>
      {list ? (
        <Table
          aria-label='Hospital Table'
          css={{
            minWidth: '500px',
          }}
          selectionMode='single'
          bordered
          defaultSelectedKeys={['1']}
          onSelectionChange={(keys) => {
            console.log('keys', parseInt(Object.entries(keys)[0][1]));
            setSelectedHospital(Object.entries(keys)[0][1]);
          }}
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <Table.Header columns={tableColumns}>
            {(column) => (
              <Table.Column
                key={column.key}
                allowsSorting={
                  column.label == 'Name' || column.label == 'Area'
                    ? true
                    : false
                }
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>

          <Table.Body items={list.items} loadingState={list.loadingState}>
            {(item) => (
              <Table.Row key={item.key}>
                {(columnKey) => (
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
        </Table>
      ) : (
        ''
      )}
    </>
  );
}

export default HospitalTable;

// import { Table } from '@nextui-org/react';
// import { useAtom, useAtomValue } from 'jotai';

// import { useUpdateAtom } from 'jotai/utils';
// import { useEffect, useState } from 'react';
// import { columnsConfigSchema } from '../../schemas/column';
// import {
//   cityStrAtom,
//   hospitalAtom,
//   hosStrAtom,
//   selectedHospitalAtom,
// } from '../../store/store.atom';

// // const Columns = ['Name', 'Address', 'Lat', 'Lan', 'Area', 'Type'];

// function HospitalTable() {
//   const hospitalsAtomValue = useAtomValue(hospitalAtom);

//   const setSelectedHospital = useUpdateAtom(selectedHospitalAtom);

//   const [hosStr] = useAtom(hosStrAtom);
//   const [cityStr] = useAtom(cityStrAtom);
//   const [hospitals, setHospitals] = useState(hospitalsAtomValue);

//   const tableColumns = Object.keys(columnsConfigSchema.shape).map((col) => ({
//     key: col,
//     label: col,
//   }));

//   console.log('tableColumns', tableColumns);

//   // const list = useMemo(() => {
//   //   return useAsyncList({ load , sort });
//   // }, [hospitals]);

//   // const list = useAsyncList({ load, sort });

//   useEffect(() => {
//     setHospitals(
//       hospitalsAtomValue.filter((hos) =>
//         hos.Name.toLowerCase().includes(hosStr.toLowerCase())
//       )
//     );
//   }, [hosStr]);
//   useEffect(() => {
//     setHospitals(
//       hospitalsAtomValue.filter((hos) =>
//         hos.Area.toLowerCase().includes(cityStr.toLowerCase())
//       )
//     );
//   }, [cityStr]);

//   return (
//     <Table
//       aria-label='Hospital Table'
//       css={{
//         minWidth: '500px',
//       }}
//       selectionMode='single'
//       bordered
//       onSelectionChange={(keys) => {
//         console.log('keys', parseInt(Object.entries(keys)[0][1]));
//         setSelectedHospital(Object.entries(keys)[0][1]);
//       }}
//     >
//       <Table.Header columns={tableColumns}>
//         {(column) => (
//           <Table.Column
//             key={column.key}
//             allowsSorting={
//               column.label == 'Name' || column.label == 'Area' ? true : false
//             }
//           >
//             {column.label}
//           </Table.Column>
//         )}
//       </Table.Header>

//       <Table.Body items={hospitals}>
//         {(item) => (
//           <Table.Row key={item.key}>
//             {(columnKey: any) => (
//               <Table.Cell
//                 css={{
//                   paddingX: '10px',
//                   textAlign: 'start',
//                   maxWidth: '200px',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 {item[columnKey]}
//               </Table.Cell>
//             )}
//           </Table.Row>
//         )}
//       </Table.Body>
//       <Table.Pagination
//         shadow
//         noMargin
//         align='center'
//         rowsPerPage={10}
//         onPageChange={(page) => console.log({ page })}
//       />
//     </Table>
//   );
// }

// export default HospitalTable;
