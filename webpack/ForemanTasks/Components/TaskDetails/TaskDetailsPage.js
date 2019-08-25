import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';
import PageLayout from 'foremanReact/pages/common/PageLayout/PageLayout';
import TaskDetails from './TaskDetails';
import { getTaskID } from './TasksDetailsHelper';

export const indexBreadcrumbItem = {
  caption: __('Tasks'),
  url: '/foreman_tasks/tasks',
};

export const breadcrumbTaskItem = task => ({
  caption: task.action || __('N/A'),
  url: `/foreman_tasks/tasks/${getTaskID()}/details`,
});

class TaskDetailsPage extends Component {
  componentDidMount() {
    const { timeoutId, refetchTaskDetails, fetchTaskDetails } = this.props;

    fetchTaskDetails(getTaskID(), timeoutId, refetchTaskDetails);
  }
  componentWillUnmount() {
    this.props.taskReloadStop(this.props.timeoutId);
  }
  render() {
    return (
      <PageLayout
        searchable={false}
        breadcrumbOptions={{
          isSwitchable: true,
          breadcrumbItems: [
            indexBreadcrumbItem,
            breadcrumbTaskItem(this.props),
          ],
          resource: {
            nameField: 'action',
            resourceUrl: '/foreman_tasks/api/tasks',
            switcherItemUrl: '/foreman_tasks/tasks/:id',
          },
        }}
      >
        <TaskDetails {...this.props} />
      </PageLayout>
    );
  }
}

TaskDetailsPage.propTypes = {
  fetchTaskDetails: PropTypes.func,
  refetchTaskDetails: PropTypes.func,
  taskReloadStop: PropTypes.func,
  timeoutId: PropTypes.number,
};

TaskDetailsPage.defaultProps = {
  fetchTaskDetails: () => null,
  refetchTaskDetails: () => null,
  taskReloadStop: () => null,
  timeoutId: null,
};
export default TaskDetailsPage;
