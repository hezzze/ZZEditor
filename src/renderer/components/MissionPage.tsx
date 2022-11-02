import { useParams } from 'react-router-dom';

const MissionPage = () => {
  const params = useParams();

  return <div>{`Misson ${params.mid}`}</div>;
};

export default MissionPage;
