import React from 'react';
import PropTypes from 'prop-types';
import { CONFIRM_MODAL } from '../TasksTableConstants';
import {
  CANCEL_SELECTED,
  RESUME_SELECTED,
  RESUME,
  CANCEL,
  FORCE_UNLOCK,
} from '../../TaskActions/TaskActionsConstants';

import { ForceUnlockModal } from '../../TaskActions/UnlockModals';

import { ConfirmModal } from './ConfirmModal';

const modalProps = type => {
  if ([CANCEL, CANCEL_SELECTED].includes(type)) {
    return { actionText: 'cancel', actionState: 'stopped' };
  } else if ([RESUME, RESUME_SELECTED].includes(type))
    return { actionText: 'resume', actionState: 'running' };
  return { actionText: '', actionState: '' };
};

export const ConfirmationModals = ({
  setModalClosed,
  tasksActions,
  selectedRowsLen,
  modalID,
}) => {
  if (modalID === FORCE_UNLOCK) {
    return (
      <ForceUnlockModal
        id={CONFIRM_MODAL}
        taskID="id"
        onClick={tasksActions[modalID]}
      />
    );
  }
  return (
    <ConfirmModal
      {...modalProps(modalID)}
      closeModal={setModalClosed}
      action={tasksActions[modalID]}
      selectedRowsLen={[CANCEL, RESUME].includes(modalID) ? 1 : selectedRowsLen}
      id={CONFIRM_MODAL}
    />
  );
};

ConfirmationModals.propTypes = {
  setModalClosed: PropTypes.func.isRequired,
  modalID: PropTypes.string.isRequired,
  selectedRowsLen: PropTypes.number.isRequired,
  tasksActions: PropTypes.shape({
    cancelTask: PropTypes.func,
    resumeTask: PropTypes.func,
    cancelSelectedTasks: PropTypes.func,
    resumeSelectedTasks: PropTypes.func,
  }).isRequired,
};

export default ConfirmationModals;
