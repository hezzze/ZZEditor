import { useParams } from 'react-router-dom';

const TaskPointPage = () => {
  const params = useParams();

  return <div>{`TaskPoint ${params.tid}`}</div>;
};

export default TaskPointPage;
