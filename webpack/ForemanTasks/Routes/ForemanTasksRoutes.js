import React from 'react';
import IndexTasks from './IndexTasks';
import TaskDetailsPage from '../Components/TaskDetails';

const ForemanTasksRoutes = {
  indexTasks: {
    path: '/foreman_tasks/ex_tasks',
    exact: true,
    render: props => <IndexTasks {...props} />,
  },
  showTask: {
    path: '/foreman_tasks/tasks/:id',
    render: props => <TaskDetailsPage {...props} />,
  },
};

export default ForemanTasksRoutes;
