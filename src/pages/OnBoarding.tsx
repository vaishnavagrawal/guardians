import { Grid, Link } from '@nextui-org/react';
import React from 'react';

import { Button } from '../components/Button';
import Stepper from '../components/Stepper/Stepper';

function OnBoarding() {
  return (
    <Grid.Container alignItems='center' css={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          right: '50px',
          top: '20px',
        }}
      >
        <Link href='/'>
          <Button flat>Home</Button>
        </Link>
      </div>
      <Stepper />
    </Grid.Container>
  );
}

export default OnBoarding;
