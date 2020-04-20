import React from 'react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';
import { ClickConfirmation } from '../../common/ClickConfirmation';
import {
  UNLOCK_MODAL,
  FORCE_UNLOCK_MODAL,
} from '../../TaskActions/TaskActionsConstants';

export const UnlockModal = ({ taskID }) => (
  <ClickConfirmation
    id={UNLOCK_MODAL}
    title={__('Unlock')}
    body={__(
      "This will unlock the resources that the task is running against. Please note that this might lead to inconsistent state and should be used with caution, after making sure that the task can't be resumed."
    )}
    confirmationMessage={__(
      'I understand that this may cause harm and have working database backups of all backend services.'
    )}
    confirmAction={__('Unlock')}
    path={`/foreman_tasks/tasks/${taskID}/unlock`}
    confirmType="warning"
  />
);

export const ForceUnlockModal = ({ taskID }) => (
  <ClickConfirmation
    id={FORCE_UNLOCK_MODAL}
    title={__('Force Unlock')}
    body={__(
      'Resources will be unlocked and will not prevent other tasks from being run. As the task might be still running, it should be avoided to use this unless you are really sure the task got stuck'
    )}
    confirmationMessage={__(
      'I understand that this may cause harm and have working database backups of all backend services.'
    )}
    confirmAction={__('Force Unlock')}
    path={`/foreman_tasks/tasks/${taskID}/force_unlock`}
    confirmType="danger"
  />
);

UnlockModal.propTypes = {
  taskID: PropTypes.string.isRequired,
};

ForceUnlockModal.propTypes = {
  taskID: PropTypes.string.isRequired,
};
