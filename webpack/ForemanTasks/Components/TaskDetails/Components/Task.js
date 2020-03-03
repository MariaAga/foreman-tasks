import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';
import TaskInfo from './TaskInfo';
import { ClickConfirmation } from '../../common/ClickConfirmation';
import { ResumeButton } from '../../common/ActionButtons/ResumeButton';
import { CancelButton } from '../../common/ActionButtons/CancelButton';

class Task extends Component {
  taskProgressToggle = () => {
    const {
      timeoutId,
      refetchTaskDetails,
      id,
      loading,
      taskReloadStop,
      taskReloadStart,
    } = this.props;
    if (timeoutId) {
      taskReloadStop(timeoutId);
    } else {
      taskReloadStart(timeoutId, refetchTaskDetails, id, loading);
    }
  };

  render() {
    const {
      taskReload,
      externalId,
      id,
      state,
      allowDangerousActions,
      resumable,
      cancellable,
      hasSubTasks,
      parentTask,
      showUnlockModal,
      showForceUnlockModal,
      toggleUnlockModal,
      toggleForceUnlockModal,
      cancelTaskRequest,
      resumeTaskRequest,
      action,
      dynflowEnableConsole,
    } = this.props;
    const modalUnlock = (
      <ClickConfirmation
        showModal={showUnlockModal}
        title={__('Unlock')}
        body={__(
          "This will unlock the resources that the task is running against. Please note that this might lead to inconsistent state and should be used with caution, after making sure that the task can't be resumed."
        )}
        confirmationMessage={__(
          'I understand that this may cause harm and have working database backups of all backend services.'
        )}
        confirmAction={__('Unlock')}
        path={`/foreman_tasks/tasks/${id}/unlock`}
        confirmType="warning"
        closeModal={toggleUnlockModal}
      />
    );

    const modalForceUnlock = (
      <ClickConfirmation
        showModal={showForceUnlockModal}
        title={__('Force Unlock')}
        body={__(
          'Resources will be unlocked and will not prevent other tasks from being run. As the task might be still running, it should be avoided to use this unless you are really sure the task got stuck'
        )}
        confirmationMessage={__(
          'I understand that this may cause harm and have working database backups of all backend services.'
        )}
        confirmAction={__('Force Unlock')}
        path={`/foreman_tasks/tasks/${id}/force_unlock`}
        confirmType="danger"
        closeModal={toggleForceUnlockModal}
      />
    );
    return (
      <React.Fragment>
        {modalUnlock}
        {modalForceUnlock}
        <Grid>
          <Row>
            <Col xs={12}>
              <Button
                hidden={!allowDangerousActions}
                className="reload-button"
                bsSize="small"
                onClick={this.taskProgressToggle}
              >
                <span
                  className={`glyphicon glyphicon-refresh ${
                    taskReload ? 'spin' : ''
                  }`}
                />
                {__(`${taskReload ? 'Stop' : 'Start'}  auto-reloading`)}
              </Button>
              <Button
                bsSize="small"
                href={`/foreman_tasks/dynflow/${externalId}`}
                disabled={!dynflowEnableConsole}
              >
                {__('Dynflow console')}
              </Button>
              <ResumeButton
                id={id}
                onClick={() => {
                  if (!taskReload) {
                    this.taskProgressToggle();
                  }
                  resumeTaskRequest(id, action);
                }}
                name={action}
                disabled={!resumable}
              />
              <CancelButton
                id={id}
                name={action}
                disabled={!cancellable}
                onClick={() => {
                  if (!taskReload) {
                    this.taskProgressToggle();
                  }
                  cancelTaskRequest(id, action);
                }}
              />
              {parentTask && (
                <Button
                  bsSize="small"
                  href={`/foreman_tasks/tasks/${parentTask}`}
                >
                  {__('Parent task')}
                </Button>
              )}
              {hasSubTasks && (
                <Button
                  bsSize="small"
                  href={`/foreman_tasks/tasks/${id}/sub_tasks`}
                >
                  {__('Sub tasks')}
                </Button>
              )}
              {allowDangerousActions && (
                <Button
                  bsSize="small"
                  disabled={state !== 'paused'}
                  onClick={toggleUnlockModal}
                >
                  {__('Unlock')}
                </Button>
              )}
              {allowDangerousActions && (
                <Button
                  bsSize="small"
                  disabled={state === 'stopped'}
                  onClick={toggleForceUnlockModal}
                >
                  {__('Force Unlock')}
                </Button>
              )}
            </Col>
          </Row>
          <TaskInfo {...this.props} />
        </Grid>
      </React.Fragment>
    );
  }
}

Task.propTypes = {
  ...TaskInfo.PropTypes,
  state: PropTypes.string,
  allowDangerousActions: PropTypes.bool,
  resumable: PropTypes.bool,
  cancellable: PropTypes.bool,
  refetchTaskDetails: PropTypes.func,
  hasSubTasks: PropTypes.bool,
  parentTask: PropTypes.string,
  taskReload: PropTypes.bool,
  taskReloadStop: PropTypes.func,
  taskReloadStart: PropTypes.func,
  timeoutId: PropTypes.number,
  externalId: PropTypes.string,
  id: PropTypes.string.isRequired,
  showUnlockModal: PropTypes.bool,
  showForceUnlockModal: PropTypes.bool,
  toggleUnlockModal: PropTypes.func,
  toggleForceUnlockModal: PropTypes.func,
  cancelTaskRequest: PropTypes.func,
  resumeTaskRequest: PropTypes.func,
  dynflowEnableConsole: PropTypes.bool,
};

Task.defaultProps = {
  ...TaskInfo.defaultProps,
  state: '',
  allowDangerousActions: false,
  resumable: false,
  cancellable: false,
  refetchTaskDetails: () => null,
  hasSubTasks: false,
  parentTask: '',
  taskReload: false,
  taskReloadStop: () => null,
  taskReloadStart: () => null,
  timeoutId: null,
  externalId: '',
  showUnlockModal: false,
  showForceUnlockModal: false,
  toggleUnlockModal: () => null,
  toggleForceUnlockModal: () => null,
  cancelTaskRequest: () => null,
  resumeTaskRequest: () => null,
  dynflowEnableConsole: false,
};

export default Task;
