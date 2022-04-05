import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'foremanReact/components/common/table';
import { STATUS } from 'foremanReact/constants';
import MessageBox from 'foremanReact/components/common/MessageBox';
import { translate as __ } from 'foremanReact/common/I18n';
import Pagination from 'foremanReact/components/Pagination';
import { getURIQuery } from 'foremanReact/common/helpers';
import createTasksTableSchema from './TasksTableSchema';
import { updateURlQuery } from './TasksTableHelpers';
import { RESUME_MODAL, CANCEL_MODAL } from './TasksTableConstants';
import { FORCE_UNLOCK_MODAL } from '../TaskActions/TaskActionsConstants';
import {
  useOpenModal,
  useOpenConfirmModal,
} from './Components/ConfirmModal/action';

const TasksTable = ({
  getTableItems,
  error,
  status,
  results,
  history,
  itemCount,
  selectedRows,
  selectPage,
  unselectAllRows,
  selectRow,
  unselectRow,
  openClickedModal,
  allRowsSelected,
  permissions,
  parentTaskID,
}) => {
  const { search, pathname } = history.location;
  const url = pathname + search;
  const uriQuery = getURIQuery(url);

  const {
    [CANCEL_MODAL]: openCancelModal,
    [RESUME_MODAL]: openResumeModal,
  } = useOpenModal({
    url,
    parentTaskID,
    query: uriQuery,
  });
  const { [FORCE_UNLOCK_MODAL]: openForceCancelModal } = useOpenConfirmModal({
    url,
    parentTaskID,
    query: uriQuery,
  });
  useEffect(() => {
    getTableItems(url);
  }, [getTableItems, url]);

  useEffect(() => {
    unselectAllRows();
  }, [unselectAllRows, search]);

  const getSelectionController = () => {
    const checkAllPageSelected = () =>
      allRowsSelected || results.length === selectedRows.length;
    return {
      allRowsSelected,
      allPageSelected: () => checkAllPageSelected(),
      selectPage: () => {
        if (checkAllPageSelected()) unselectAllRows();
        else {
          selectPage(results);
        }
      },
      selectRow: ({ rowData: { id } }) => {
        if (selectedRows.includes(id) || allRowsSelected)
          unselectRow(id, allRowsSelected && results);
        else selectRow(id);
      },
      isSelected: ({ rowData }) =>
        allRowsSelected || selectedRows.includes(rowData.id),
      permissions,
    };
  };

  if (status === STATUS.ERROR) {
    return (
      <MessageBox
        key="tasks-table-error"
        icontype="error-circle-o"
        msg={__(`Could not receive data: ${error && error.message}`)}
      />
    );
  }

  if (status === STATUS.PENDING && results.length === 0) {
    return <div />;
  }

  if (results.length === 0) {
    return <span>{__('No Tasks')}</span>;
  }

  const setSortHistory = (by, order) => {
    updateURlQuery({ sort_by: by, sort_order: order }, history);
  };

  const taskActions = {
    cancelTask: (taskId, taskName) => {
      openClickedModal({
        taskId,
        taskName,
        setModalOpen: openCancelModal,
      });
    },
    resumeTask: (taskId, taskName) => {
      openClickedModal({
        taskId,
        taskName,
        setModalOpen: openResumeModal,
      });
    },
    forceCancelTask: (taskId, taskName) => {
      openClickedModal({
        taskId,
        taskName,
        setModalOpen: openForceCancelModal,
      });
    },
  };

  return (
    <div className="tasks-table">
      <Table
        key="tasks-table"
        columns={createTasksTableSchema(
          setSortHistory,
          uriQuery.sort_by,
          uriQuery.sort_order,
          taskActions,
          getSelectionController()
        )}
        rows={results}
      />
      <Pagination itemCount={itemCount} />
    </div>
  );
};

TasksTable.propTypes = {
  results: PropTypes.array.isRequired,
  getTableItems: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS)),
  error: PropTypes.instanceOf(Error),
  itemCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  openClickedModal: PropTypes.func.isRequired,
  selectedRows: PropTypes.array,
  selectPage: PropTypes.func.isRequired,
  unselectAllRows: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  unselectRow: PropTypes.func.isRequired,
  allRowsSelected: PropTypes.bool,
  permissions: PropTypes.shape({
    edit: PropTypes.bool,
  }),
};

TasksTable.defaultProps = {
  status: STATUS.PENDING,
  error: null,
  selectedRows: [],
  allRowsSelected: false,
  permissions: {
    edit: false,
  },
};

export default TasksTable;
