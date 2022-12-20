import { Grid, Link, Row, styled } from '@nextui-org/react';
import React from 'react';
import { Button } from '../components/Button';
import HospitalCard from '../components/HospitalCard';
import Search from '../components/Search';
import HospitalTable from '../components/table/HospitalTable';

function Hospitals() {
  return (
    <Grid.Container alignItems='center' css={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          right: '50px',
          top: '20px',
        }}
      >
        <Link href='/onboarding'>
          <Button flat>OnBoarding</Button>
        </Link>
      </div>
      <Grid.Container justify='space-between' css={{ w: '100%', p: '$10' }}>
        <div>
          <Search />
          <br />
          <br />

          <HospitalTable />
        </div>
        <div>
          <HospitalCard></HospitalCard>
        </div>
      </Grid.Container>
    </Grid.Container>
  );
}

export default Hospitals;
