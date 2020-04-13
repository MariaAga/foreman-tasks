import { getControllerSearchProps } from 'foremanReact/constants';

export const TASKS_TABLE_ID = 'TASKS_TABLE';
export const SELECT_ROWS = 'SELECT_ROWS';
export const UNSELECT_ROWS = 'UNSELECT_ROWS';
export const UNSELECT_ALL_ROWS = 'UNSELECT_ALL_ROWS';
export const TASKS_RESUME_REQUEST = 'TASKS_RESUME_REQUEST';
export const TASKS_RESUME_SUCCESS = 'TASKS_RESUME_SUCCESS';
export const TASKS_RESUME_FAILURE = 'TASKS_RESUME_FAILURE';

export const CANCEL = 'cancelConfirmModal';
export const RESUME = 'resumeConfirmModal';
export const CANCEL_SELECTED = 'cancelSelectedConfirmModal';
export const RESUME_SELECTED = 'resumeSelectedConfirmModal';
export const CONFIRM_MODAL = 'ConfirmModal';

export const UPDATE_CLICKED = 'UPDATE_CLICKED';

export const TASKS_SEARCH_PROPS = {
  ...getControllerSearchProps('tasks'),
  controller: 'foreman_tasks/tasks',
};
