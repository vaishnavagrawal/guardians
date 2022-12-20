import { Input, Spacer } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { cityStrAtom, hospitalAtom, hosStrAtom } from '../store/store.atom';

function Search() {
  const [searchStr, setSearchStr] = useAtom(hosStrAtom);

  const setHosStr = useUpdateAtom(hosStrAtom);
  const setCityStr = useUpdateAtom(cityStrAtom);

  const [hospitals, setHospitals] = useAtom(hospitalAtom);

  const filterTable = (str: string) => {
    // console.log(hospitals.filter(hos => hos.Name.includes(str)))
    setHospitals(hospitals.filter((hos) => hos.Name.includes(str)));
  };

  const hosHandler = (e: any) => {
    if (e.target.value === '') {
    }
    setHosStr(e.target.value);
    // filterTable(e.target.value)
  };
  const cityHandler = (e: any) => {
    if (e.target.value === '') {
    }
    setCityStr(e.target.value);
    // filterTable(e.target.value)
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Input
        rounded
        bordered
        aria-label='Hospital'
        placeholder='Hospital'
        color='primary'
        fullWidth
        onChange={hosHandler}
        clearable
      />
      <Spacer y={0.5} />
      <Input
        rounded
        bordered
        aria-label='Hospital'
        placeholder='City'
        color='primary'
        fullWidth
        onChange={cityHandler}
        clearable
      />
    </div>
  );
}

export default Search;
