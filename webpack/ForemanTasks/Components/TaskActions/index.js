import { addToast } from 'foremanReact/redux/actions/toasts';
import { translate as __ } from 'foremanReact/common/I18n';
import API from 'foremanReact/API';

export const resumeTaskRequest = (id, name) => async dispatch => {
  try {
    await API.post(`/foreman_tasks/tasks/${id}/resume`);
    dispatch(
      addToast({
        type: 'success',
        message: __(`"${name}" ${__('Task execution was resumed')}`),
      })
    );
  } catch ({ response }) {
    dispatch(
      addToast({
        type: 'error',
        message: __(`Task "${name}" has to be resumable.`),
      })
    );
  }
};

export const cancelTaskRequest = (id, name) => async dispatch => {
  dispatch(
    addToast({
      type: 'info',
      message: `${__('Trying to cancel')} "${name}" ${__('task')}`,
    })
  );
  try {
    await API.post(`/foreman_tasks/tasks/${id}/cancel`);
    dispatch(
      addToast({
        type: 'success',
        message: `"${name}" ${__('Task cancelled')}`,
      })
    );
  } catch ({ response }) {
    dispatch(
      addToast({
        type: 'error',
        message: `"${name}" ${__('Task cannot be cancelled at the moment.')}`,
      })
    );
  }
};
