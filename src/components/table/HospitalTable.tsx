// import { Table, useCollator } from '@nextui-org/react';
// import { useAtom, useAtomValue } from 'jotai';

// import { useUpdateAtom } from 'jotai/utils';
// import { useCallback, useEffect, useState } from 'react';
// import { ColumnsConfig, columnsConfigSchema } from '../../schemas/column';
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

//   // const [list, setList] = useState<any>();

//   const tableColumns = Object.keys(columnsConfigSchema.shape).map((col) => ({
//     key: col,
//     label: col,
//   }));

//   console.log('tableColumns', tableColumns);
//   const collator = useCollator({ numeric: true });

//   const load = useCallback(async () => {
//     return {
//       items: hospitals,
//     };
//   }, [hospitals]);

//   // async function load({ signal }: any) {
//   //   // const res = await fetch("https://swapi.py4e.com/api/people/?search", {
//   //   //   signal
//   //   // });
//   //   // const json = await res.json();
//   //   // return {
//   //   //   items: json.results
//   //   // };
//   //   return {
//   //     items: hospitals,
//   //   };
//   // }
//   async function sort({
//     items,
//     sortDescriptor,
//   }: {
//     items: ColumnsConfig[];
//     sortDescriptor: any;
//   }) {
//     console.log('items ', items);
//     console.log('sortDescriptor', sortDescriptor);
//     return {
//       items: items.sort((a, b) => {
//         let first = a[sortDescriptor.column];
//         let second = b[sortDescriptor.column];
//         let cmp = collator.compare(first, second);
//         if (sortDescriptor.direction === 'descending') {
//           cmp *= -1;
//         }
//         return cmp;
//       }),
//     };
//   }

//   // const list = useMemo(() => {
//   //   return useAsyncList({ load , sort });
//   // }, [hospitals]);

//   // const list = useAsyncList({ load, sort });

//   // useEffect(() => {
//   //   setList(useAsyncList({ load, sort }));
//   // }, [hospitals]);

//   console.log('list', list);
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
//     <>
//       {list ? (
//         <Table
//           aria-label='Example table with static content'
//           css={{
//             // height: 'auto',
//             minWidth: '500px',
//           }}
//           selectionMode='single'
//           bordered
//           onSelectionChange={(keys) => {
//             console.log('keys', parseInt(Object.entries(keys)[0][1]));
//             setSelectedHospital(Object.entries(keys)[0][1]);
//           }}
//           sortDescriptor={list.sortDescriptor}
//           onSortChange={list.sort}
//         >
//           {/* <Table.Header>
//         {table.getHeaderGroups()[0].headers.map((header) => {
//           // return <div>{header.column.columnDef.header}</div>;
//           return (
//             <Table.Column>
//               {flexRender(header.column.columnDef.header, header.getContext())}
//             </Table.Column>
//           );
//         })}
//       </Table.Header> */}
//           <Table.Header columns={tableColumns}>
//             {(column) => (
//               <Table.Column
//                 key={column.key}
//                 allowsSorting={
//                   column.label == 'Name' || column.label == 'Area'
//                     ? true
//                     : false
//                 }
//                 css={
//                   {
//                     // bg: {(column.label=='Name' || column.label== "Area" ) ? 'gray' : ''}
//                   }
//                 }
//               >
//                 {column.label}
//               </Table.Column>
//             )}
//           </Table.Header>
//           {/* <Table.Body>
//         {Object.values(hospitals).map((hospital, i) => {
//           return (
//             <Table.Row key={hospital.Id}>
//               {Object.keys(hospital).map((key) => {
//                 return (
//                   <Table.Cell
//                     key={hospital.Id}
//                     css={{
//                       paddingX: '10px',
//                       textAlign: 'start',
//                       maxWidth: '200px',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                     }}
//                   >
//                     {hospital[key as keyof typeof hospital]}
//                   </Table.Cell>
//                 );
//               })}
//             </Table.Row>
//           );
//         })}
//       </Table.Body> */}
//           {/* <Table.Body loadingState={list.loadingState}>
//         {list.items.map((hospital, i) => {
//           return (
//             <Table.Row key={hospital.key}>
//               {Object.keys(hospital).map((key) => {
//                 return (
//                   <Table.Cell
//                     key={hospital.key}
//                     css={{
//                       paddingX: '10px',
//                       textAlign: 'start',
//                       maxWidth: '200px',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                     }}
//                   >
//                     {hospital[key as keyof typeof hospital]}
//                   </Table.Cell>
//                 );
//               })}
//             </Table.Row>
//           );
//         })}
//       </Table.Body> */}
//           <Table.Body items={list.items} loadingState={list.loadingState}>
//             {(item) => (
//               <Table.Row key={item.key}>
//                 {(columnKey) => (
//                   <Table.Cell
//                     css={{
//                       paddingX: '10px',
//                       textAlign: 'start',
//                       maxWidth: '200px',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                     }}
//                   >
//                     {item[columnKey]}
//                   </Table.Cell>
//                 )}
//               </Table.Row>
//             )}
//           </Table.Body>
//           {/* <Table.Pagination
//         shadow
//         noMargin
//         align='center'
//         rowsPerPage={10}
//         onPageChange={(page) => console.log({ page })}
//       /> */}
//         </Table>
//       ) : (
//         ''
//       )}
//     </>
//   );
// }

// export default HospitalTable;

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

// const Columns = ['Name', 'Address', 'Lat', 'Lan', 'Area', 'Type'];

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

  console.log('tableColumns', tableColumns);

  // const list = useMemo(() => {
  //   return useAsyncList({ load , sort });
  // }, [hospitals]);

  // const list = useAsyncList({ load, sort });

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
