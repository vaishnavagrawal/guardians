import { Badge, Card, Grid, Link, Row, Spacer, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';

import { hospitalAtom, selectedHospitalAtom } from '../store/store.atom';

function HospitalCard() {
  const id = useAtomValue(selectedHospitalAtom);

  // const id = useMemo(() => {
  //   return selectedHos ?? 0;
  // }, [selectedHos]);

  const hospitals = useAtomValue(hospitalAtom);
  // console.log('id', id, hospitals);

  return (
    <>
      {hospitals ? (
        <Card css={{ m: '20px', w: '400px', px: '$8', pb: '$8' }}>
          <Card.Header css={{ width: 'auto' }}>
            <Row align='flex-start'>
              <Badge css={{ mt: 24 }}>{hospitals[id - 1].key}</Badge>
              <Spacer></Spacer>
              <Text h4 css={{ mb: 0 }}>
                {hospitals[id - 1].Name}
              </Text>
            </Row>
          </Card.Header>
          <Card.Body css={{ width: 'auto', pt: 0 }}>
            {/* <Text h4>{hospitals[id].Name}</Text> */}
            <Text>{hospitals[id - 1].Address}</Text>
            <Row align='center'>
              LAT :<b>{hospitals[id - 1].Lat}</b>
            </Row>
            <Row align='center'>
              LNG :<b>{hospitals[id - 1].Lng}</b>
            </Row>
          </Card.Body>
          <Card.Footer css={{ width: 'auto' }}>
            <Row justify='space-between'>
              {hospitals[id - 1].Area}
              <Badge size='md'>{hospitals[id - 1].Type}</Badge>
            </Row>
          </Card.Footer>
        </Card>
      ) : (
        ''
      )}
    </>
  );
}

export default HospitalCard;
