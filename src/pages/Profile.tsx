import React from 'react';
import { Col, Grid, Link, Row, User } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { profileAtom } from '../store/store.atom';
import { Card } from '../components/Card';
import Profile from '../components/Profile';
import { Button } from '../components/Button';

function ProfilePage() {
  const profile = useAtomValue(profileAtom);

  return (
    <Grid.Container alignItems='center' css={{ minHeight: '100vh' }}>
      <Col>
        <Row
          justify='space-between'
          css={{ w: '400px', mw: '100%', mx: 'auto', mb: '$8' }}
        >
          <h2 style={{ justifySelf: 'flex-start', marginTop: '10px' }}>
            Profile
          </h2>
          <Link href='/onboarding/edit'>
            <Button flat>Edit</Button>
          </Link>
        </Row>
        <Card css={{ mx: 'auto' }}>
          <Grid.Container gap={2} direction='column'>
            <Profile {...profile} />
          </Grid.Container>
        </Card>
      </Col>
    </Grid.Container>
  );
}

export default ProfilePage;
