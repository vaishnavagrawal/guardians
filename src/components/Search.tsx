import { Input } from '@nextui-org/react';
import { useAtom } from 'jotai';
import React from 'react';
import { hospitalAtom, searchAtom } from '../store/store.atom';

function Search() {
  const [searchStr, setSearchStr] = useAtom(searchAtom);
    const [hospitals , setHospitals] = useAtom(hospitalAtom)

    const filterTable = (str : string ) =>{
        // console.log(hospitals.filter(hos => hos.Name.includes(str)))
        setHospitals(hospitals.filter(hos => hos.Name.includes(str)))
    }

  const changeHandler = (e: any) => {
    if(e.target.value===''){

    }
    setSearchStr(e.target.value);
    // filterTable(e.target.value)
  };

  return (
    <Input
      rounded
      bordered
      // label="Primary"
      placeholder='Hospital'
      color='primary'
      width='100%'
      onChange={changeHandler}
      clearable

    />
  );
}

export default Search;
