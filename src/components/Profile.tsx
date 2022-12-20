import {
  Divider,
  Grid,
  Link,
  Row,
  Spacer,
  Text,
  Tooltip,
  User,
} from '@nextui-org/react';
import { OnboardingData } from '../schemas/form';
import { AiOutlinePhone } from 'react-icons/ai';
import { TbPhonePlus } from 'react-icons/tb';
import { MdOutlineEmergency } from 'react-icons/md';
import { Button } from './Button';

function Profile(data: OnboardingData) {
  const gravatar = `https://www.gravatar.com/avatar/${data.basic.email}?s=64&d=identicon&r=PG`;
  console.log(data);
  return (
    <>
      <Grid.Container gap={2} direction='column'>
        <User
          name={data.basic.name}
          text={data.basic.name}
          src={gravatar}
          bordered
          description={data.basic.email}
          color='primary'
          zoomed
          css={{ pl: 0, ml: '-10px' }}
        ></User>
        <Row css={{ mt: '$4', cursor: 'pointer' }} align='center'>
          <Tooltip content={'Contact Number'} placement='left'>
            <Button size={'xs'} flat icon={<AiOutlinePhone />}></Button>
            <Spacer x={0.5} />

            {data.basic.mobile}
          </Tooltip>
        </Row>
        <Spacer y={0.5} />
        <Row css={{ cursor: 'pointer' }} align='center'>
          <Tooltip content={'Emergency Contact'} placement='left'>
            <Button
              size={'xs'}
              flat
              // css={{ margin: '$5' }}
              icon={<MdOutlineEmergency />}
            ></Button>
            <Spacer x={0.5} />
            {data.contact.emergency}{' '}
          </Tooltip>
        </Row>
        <Spacer y={0.5}></Spacer>
        <Divider />
        <Spacer y={0.5}></Spacer>
        <div>
          <b>Allergies</b>
          {/* <Spacer x={1} /> */}
          <br />
          <div>{data.medical.allergies}</div>
        </div>{' '}
        <Spacer y={0.5}></Spacer>
        <div>
          <b>Current Meds</b>
          {/* <Spacer x={1} /> */}
          <div>{data.medical.currentMedications}</div>
        </div>
        <Spacer y={0.5}></Spacer>
        <div>
          <b>MedicalConditions</b>
          {/* <Spacer x={1} /> */}
          <br />
          <div>{data.medical.medicalConditions}</div>
        </div>
        <Spacer y={1}></Spacer>
        {/* <Row justify='flex-end'>
          <Link href='/onboarding'>
            <Button>Edit</Button>
          </Link>
        </Row> */}
      </Grid.Container>
    </>
  );
}

export default Profile;
