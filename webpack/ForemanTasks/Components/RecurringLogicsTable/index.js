import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAPIErrorMessage,
  selectAPIStatus,
} from 'foremanReact/redux/API/APISelectors';
import { selectResults } from './RecurringLogicsTableSelectors';

import { RECURRING_LOGICS } from './RecurringLogicsTableConstants';
import RecurringLogicsTable from './RecurringLogicsTable';
import { getTableItems } from './RecurringLogicsTableActions';

const ConnectedRecurringLogicsTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTableItems());
  }, [dispatch]);
  const recurringLogics = useSelector(selectResults);
  const error = useSelector(state =>
    selectAPIErrorMessage(state, RECURRING_LOGICS)
  );
  const status = useSelector(state => selectAPIStatus(state, RECURRING_LOGICS));

  return (
    <RecurringLogicsTable
      recurringLogics={recurringLogics}
      error={error}
      status={status}
    />
  );
};

export default ConnectedRecurringLogicsTable;
