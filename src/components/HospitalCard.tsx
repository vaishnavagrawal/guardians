import { Badge, Card, Grid, Link, Row, Spacer, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';

import { hospitalAtom, selectedHospitalAtom } from '../store/store.atom';

function HospitalCard() {
  const id = useAtomValue(selectedHospitalAtom);
  const hospitals = useAtomValue(hospitalAtom);
  return (
    <>
      {hospitals && id ? (
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
            <Text>{hospitals[id].Address}</Text>
            <Row align='center'>
              LAT :<b>{hospitals[id].Lat}</b>
            </Row>
            <Row align='center'>
              LNG :<b>{hospitals[id].Lng}</b>
            </Row>
          </Card.Body>
          <Card.Footer css={{ width: 'auto' }}>
            <Row justify='space-between'>
              {hospitals[id].Area}
              <Badge size='md'>{hospitals[id].Type}</Badge>
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
