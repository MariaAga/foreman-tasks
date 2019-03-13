import React from 'react';
import TasksDonutCard from '../TasksDonutCard/TasksDonutCard';

const RunningTasksCard = ({ ...props }) => (
  <TasksDonutCard title="Running" {...props} />
);

const filterTitle = obj => {
  const { title, ...newObj } = obj;
  return newObj;
};

RunningTasksCard.propTypes = {
  ...filterTitle(TasksDonutCard.propTypes),
};
RunningTasksCard.defaultProps = {
  ...filterTitle(TasksDonutCard.defaultProps),
};
export default RunningTasksCard;
