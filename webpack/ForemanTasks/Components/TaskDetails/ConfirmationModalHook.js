import React from 'react';
import { startCase } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { sprintf, translate as __ } from 'foremanReact/common/I18n';
import { openConfirmModal } from 'foremanReact/components/ConfirmModal';
import tasksActions from './ConfirmModalActions';
import {
  UNLOCK_MODAL,
  FORCE_UNLOCK_MODAL,
} from '../TaskActions/TaskActionsConstants';
import { ConfirmFooter } from '../TasksTable/Components/ConfirmModal/ConfirmFooter';

const className = 'foreman-tasks-modal';

export const useOpenConfirmModal = props => {
  const dispatch = useDispatch();
  const actionNames = [UNLOCK_MODAL, FORCE_UNLOCK_MODAL];
  const actions = {};

  const forceUnlock = () => {
    if (!taskReload) {
      taskReloadStart(id);
    }
    forceCancelTaskRequest(id, action);
  };
  const unlock = () => {
    if (!taskReload) {
      taskReloadStart(id);
    }
    unlockTaskRequest(id, action);
  };
  actionNames.forEach(action => {
    const isForce = action !== UNLOCK_MODAL;
    const confirmType = isForce ? 'danger' : 'warning';
    const confirmAction = isForce ? __('Force Unlock') : __('Unlock');
    const messageText =
      action === UNLOCK_MODAL
        ? __(
            "This will unlock the resources that the task is running against. Please note that this might lead to inconsistent state and should be used with caution, after making sure that the task can't be resumed."
          )
        : sprintf(
            __(
              `Resources for %s task(s) will be unlocked and will not prevent other tasks from being run. As the task(s) might be still running, it should be avoided to use this unless you are really sure the task(s) got stuck.`
            ),
            1
          );

    actions[action] = () =>
      dispatch(
        openConfirmModal({
          title: confirmAction,
          message: messageText,
          onConfirm: () => {},
          modalProps: {
            className,
            footer: (
              <ConfirmFooter
                confirmType={confirmType}
                confirmAction={confirmAction}
                action={action}
                {...props}
              />
            ),
          },
        })
      );
  });
  return actions;
};
