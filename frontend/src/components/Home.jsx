import { Title, Subtitle, Table } from './subcomponent';
import styled from 'styled-components';
import { Bold } from './subcomponent';

const HomeWrapper = styled.div`
  margin: min(20rem, 30vh) 0;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Title>
        Notify yourself on potential <Bold>TTC</Bold> alerts.
      </Title>
      <Subtitle>
        <Bold>TrackTC</Bold> will take care of <Bold>all TTC alerts </Bold> 
         in Downtown Toronto along your commute, using reliable database system.
      </Subtitle>
      <Table/>
    </HomeWrapper>
  );
}

export default Home;