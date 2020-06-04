import { getTableItemsAction } from 'foremanReact/components/common/table';
import { RECURRING_LOGICS } from './RecurringLogicsTableConstants';

export const getTableItems = () =>
  getTableItemsAction(
    RECURRING_LOGICS,
    {},
    `/foreman_tasks/api/recurring_logics${window.location.search}`
  );
