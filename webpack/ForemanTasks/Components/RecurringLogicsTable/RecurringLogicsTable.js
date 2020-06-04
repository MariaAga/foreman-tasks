import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { Table } from 'foremanReact/components/common/table';
import { STATUS } from 'foremanReact/constants';
import MessageBox from 'foremanReact/components/common/MessageBox';
import { translate as __ } from 'foremanReact/common/I18n';
import createTasksTableSchema from './RecurringLogicsSchema';

const RecurringLogicsTable = ({ status, recurringLogics, error }) => {
  if (status === STATUS.ERROR) {
    return (
      <MessageBox
        key="tasks-table-error"
        icontype="error-circle-o"
        msg={__(`Could not receive data: ${error}`)}
      />
    );
  }

  if (status === STATUS.PENDING && recurringLogics.length === 0) {
    return <Spinner size="lg" loading />;
  }

  if (recurringLogics.length === 0) {
    return <span>{__('No Recurring Logics')}</span>;
  }

  return (
    <div className="tasks-table">
      <Table
        key="tasks-table"
        columns={createTasksTableSchema()}
        rows={recurringLogics}
      />
    </div>
  );
};

RecurringLogicsTable.propTypes = {
  status: PropTypes.string,
  recurringLogics: PropTypes.array,
  error: PropTypes.string,
};

RecurringLogicsTable.defaultProps = {
  status: '',
  recurringLogics: [],
  error: null,
};
export default RecurringLogicsTable;
