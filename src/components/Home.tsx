import { styled } from '@nextui-org/react'
import React from 'react'
import HospitalCard from './HospitalCard'
import Search from './Search'
import HospitalTable from './table/HospitalTable'

function Home() {
  const Flex =styled('div' , {
    display : 'flex',
          justifyContent : 'space-between',

    variants : {
      justifyCenter : {
        true : {
          justifyContent : 'center'
        }
      }
    }
  })
  return (
    <Flex >
      sdfs 
    <div>

      <Search/>
      <br />
      <br />

      <HospitalTable/>
    </div>
    <div>
      {/* <HospitalCard></HospitalCard> */}
    </div>
    </Flex>
  )
}

export default Home