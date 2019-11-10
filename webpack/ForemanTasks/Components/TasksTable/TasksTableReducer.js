import Immutable from 'seamless-immutable';
import { combineReducers } from 'redux';
import { union } from 'lodash';
import { createTableReducer } from 'foremanReact/components/common/table';
import createTableActionTypes from 'foremanReact/components/common/table/actionsHelpers/actionTypeCreator';
import {
  TASKS_TABLE_ID,
  SELECT_ROWS,
  UNSELECT_ROWS,
  UNSELECT_ALL_ROWS,
  TASKS_TABLE_SHOW_CANCEL_ALL_MODAL,
  TASKS_TABLE_HIDE_CANCEL_ALL_MODAL,
} from './TasksTableConstants';

const initialState = Immutable({
  selectedRows: [],
  isCancelAllModalOpen: false,
});

export const TasksTableQueryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { subtotal, page, per_page: perPageString, action_name: actionName } =
    payload || {};
  const ACTION_TYPES = createTableActionTypes(TASKS_TABLE_ID);
  switch (type) {
    case ACTION_TYPES.SUCCESS:
      return Immutable.merge(state, {
        itemCount: subtotal,
        actionName,
        pagination: {
          page: Number(page),
          perPage: Number(perPageString),
        },
        selectedRows: [],
      });
    case SELECT_ROWS:
      return state.set('selectedRows', union(payload, state.selectedRows));
    case UNSELECT_ROWS:
      return state.set(
        'selectedRows',
        state.selectedRows.filter(row => row !== payload)
      );
    case UNSELECT_ALL_ROWS:
      return state.set('selectedRows', []);
    case TASKS_TABLE_SHOW_CANCEL_ALL_MODAL:
      return state.set('isCancelAllModalOpen', true);
    case TASKS_TABLE_HIDE_CANCEL_ALL_MODAL:
      return state.set('isCancelAllModalOpen', false);
    default:
      return state;
  }
};
export default combineReducers({
  tasksTableContent: createTableReducer(TASKS_TABLE_ID),
  tasksTableQuery: TasksTableQueryReducer,
});
