import React from 'react';
import { startCase } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { sprintf, translate as __ } from 'foremanReact/common/I18n';
import { openConfirmModal } from 'foremanReact/components/ConfirmModal';
import tasksActions from './ConfirmModalActions';
import {
  CANCEL_SELECTED_MODAL,
  RESUME_SELECTED_MODAL,
  RESUME_MODAL,
  CANCEL_MODAL,
  FORCE_UNLOCK_SELECTED_MODAL,
} from '../../TasksTableConstants';
import {
  UNLOCK_MODAL,
  FORCE_UNLOCK_MODAL,
} from '../../../TaskActions/TaskActionsConstants';
import { selectSelectedRowsLen } from './ConfirmModalSelectors';
import { ConfirmFooter } from './ConfirmFooter';

const className = 'foreman-tasks-modal';

const getAction = id => {
  switch (id) {
    case CANCEL_SELECTED_MODAL:
    case CANCEL_MODAL:
      return {
        actionText: 'cancel',
        actionState: 'stopped',
        actionType: id,
      };

    case RESUME_SELECTED_MODAL:
    case RESUME_MODAL:
      return {
        actionText: 'resume',
        actionState: 'running',
        actionType: id,
      };
    default:
      return {};
  }
};
export const useOpenModal = ({ url, query, parentTaskID }) => {
  const dispatch = useDispatch();
  const selectedRowsLen = useSelector(selectSelectedRowsLen);
  const actionNames = [
    CANCEL_SELECTED_MODAL,
    CANCEL_MODAL,
    RESUME_SELECTED_MODAL,
    RESUME_MODAL,
  ];
  const actions = {};
  actionNames.forEach(action => {
    const { actionText, actionType, actionState } = getAction(action);
    const tasksAmount = [CANCEL_MODAL, RESUME_MODAL].includes(action)
      ? 1
      : selectedRowsLen;
    actions[action] = () =>
      dispatch(
        openConfirmModal({
          title: sprintf(__('%s Selected Tasks'), startCase(actionText)),
          message: sprintf(
            __(
              `This will %(action)s %(number)s task(s), putting them in the %(state)s state. Are you sure?`
            ),
            { action: actionText, number: tasksAmount, state: actionState }
          ),
          onConfirm: () => {
            dispatch(tasksActions[actionType]({ url, query, parentTaskID }));
          },
          modalProps: { className },
        })
      );
  });
  return actions;
};

export const useOpenConfirmModal = props => {
  const dispatch = useDispatch();
  const selectedRowsLen = useSelector(selectSelectedRowsLen);
  const actionNames = [
    UNLOCK_MODAL,
    FORCE_UNLOCK_MODAL,
    FORCE_UNLOCK_SELECTED_MODAL,
  ];
  const actions = {};
  actionNames.forEach(action => {
    const isForce = action !== UNLOCK_MODAL;
    const confirmType = isForce ? 'danger' : 'warning';
    const confirmAction = isForce ? __('Force Unlock') : __('Unlock');
    const tasksAmount =
      action !== FORCE_UNLOCK_SELECTED_MODAL ? 1 : selectedRowsLen;
    const messageText =
      action === UNLOCK_MODAL
        ? __(
            "This will unlock the resources that the task is running against. Please note that this might lead to inconsistent state and should be used with caution, after making sure that the task can't be resumed."
          )
        : sprintf(
            __(
              `Resources for %s task(s) will be unlocked and will not prevent other tasks from being run. As the task(s) might be still running, it should be avoided to use this unless you are really sure the task(s) got stuck.`
            ),
            tasksAmount
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
