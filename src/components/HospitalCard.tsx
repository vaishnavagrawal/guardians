import { Badge, Card, Grid, Link, Row, Spacer, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';

import { hospitalAtom, selectedHospitalAtom } from '../store/store.atom';

function HospitalCard() {
  const id = parseInt(useAtomValue(selectedHospitalAtom));
  const hospitals = useAtomValue(hospitalAtom);
  return (
    <Card css={{ m:'20px' , w : '400px' }}>
      <Card.Header css={{ width:'auto'}}>
        <Row align='flex-start'>
<Text>

        <Badge>
          {hospitals[id].Id} 
        </Badge>
</Text>
        <Spacer></Spacer>
        <Text h4 >
          {hospitals[id].Name}
        </Text>
        </Row>
       
      </Card.Header>
      <Card.Body css={{ width:'auto'}}>
        {/* <Text h4>{hospitals[id].Name}</Text> */}
        <Text>{hospitals[id].Address}</Text>
        <Row align='center'>
          LAT :<Text weight={'bold'}>{hospitals[id].Lat}</Text>
        </Row>
        <Row align='center'>
          LNG :<Text weight={'bold'}>{hospitals[id].Lng}</Text>
        </Row>
        {/* <Row justify='space-between'>
          {hospitals[id].Area}
          <Badge size='md'>{hospitals[id].Type}</Badge>
        </Row> */}
      </Card.Body>
      <Card.Footer css={{ width:'auto'}}>
        <Row justify='space-between'>

        {hospitals[id].Area}
        <Badge size="md">{hospitals[id].Type}</Badge>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default HospitalCard;
