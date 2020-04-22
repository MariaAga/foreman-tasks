import { addToast } from 'foremanReact/redux/actions/toasts';
import { translate as __ } from 'foremanReact/common/I18n';
import API from 'foremanReact/API';

const dispatchToast = (dispatch, params) => {
  dispatch(addToast(params));
};

export const resumeTaskRequest = (id, name) => async dispatch => {
  try {
    await API.post(`/foreman_tasks/tasks/${id}/resume`);
    dispatchToast(dispatch, {
      type: 'success',
      message: __(`"${name}" ${__('Task execution was resumed')}`),
    });
  } catch ({ response }) {
    dispatchToast(dispatch, {
      type: 'error',
      message: __(`Task "${name}" has to be resumable.`),
    });
  }
};

export const cancelTaskRequest = (id, name) => async dispatch => {
  dispatchToast(dispatch, {
    type: 'info',
    message: `${__('Trying to cancel')} "${name}" ${__('task')}`,
  });
  try {
    await API.post(`/foreman_tasks/tasks/${id}/cancel`);
    dispatchToast(dispatch, {
      type: 'success',
      message: `"${name}" ${__('Task cancelled')}`,
    });
  } catch ({ response }) {
    dispatchToast(dispatch, {
      type: 'error',
      message: `"${name}" ${__('Task cannot be cancelled at the moment.')}`,
    });
  }
};

export const forceCancelTaskRequest = (id, name) => async dispatch => {
  dispatchToast(dispatch, {
    type: 'info',
    message: `${__('Trying to force cancel')} "${name}" ${__('task')}`,
  });
  try {
    await API.post(`/foreman_tasks/tasks/${id}/force_unlock`);
    dispatchToast(dispatch, {
      type: 'success',
      message: `"${name}" ${__('Task resources were unlocked with force.')}`,
    });
  } catch ({ response }) {
    dispatchToast(dispatch, {
      type: 'error',
      message: `"${name}" ${__(
        'Task cannot be cancelled with force at the moment.'
      )}`,
    });
  }
};

export const unlockTaskRequest = (id, name) => async dispatch => {
  dispatchToast(dispatch, {
    type: 'info',
    message: `${__('Trying to unlock')} "${name}" ${__('task resources')}`,
  });
  try {
    await API.post(`/foreman_tasks/tasks/${id}/unlock`);
    dispatchToast(dispatch, {
      type: 'success',
      message: `"${name}" ${__('Task resources were unlocked ')}`,
    });
  } catch ({ response }) {
    dispatchToast(dispatch, {
      type: 'error',
      message: `"${name}" ${__(
        'Task resources cannot be unlocked at the moment.'
      )}`,
    });
  }
};
