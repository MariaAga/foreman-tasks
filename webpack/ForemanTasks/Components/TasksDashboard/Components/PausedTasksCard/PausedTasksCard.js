import React from 'react';
import TasksDonutCard from '../TasksDonutCard/TasksDonutCard';

const PausedTasksCard = ({ ...props }) => (
  <TasksDonutCard title="Paused" {...props} />
);

const filterTitle = obj => {
  const { title, ...newObj } = obj;
  return newObj;
};

PausedTasksCard.propTypes = {
  ...filterTitle(TasksDonutCard.propTypes),
};
PausedTasksCard.defaultProps = {
  ...filterTitle(TasksDonutCard.defaultProps),
};

export default PausedTasksCard;
