import { createSelector } from 'reselect';
import { selectAPIResponse } from 'foremanReact/redux/API/APISelectors';

import {
  getLastOccurrence,
  getNextOccurrence,
} from './RecurringLogicsTableHelper';
import { RECURRING_LOGICS } from './RecurringLogicsTableConstants';

const selectResponse = state => selectAPIResponse(state, RECURRING_LOGICS);

export const selectResults = createSelector(selectResponse, ({ results }) =>
  results
    ? results.map(result => ({
        cronLine: result.cron_line,
        taskCount: result.tasks.length,
        action: result.tasks[0] ? result.tasks[0].action : '-',
        lastOccurrence: getLastOccurrence(result.tasks),
        nextOccurrence: getNextOccurrence(result.state, result.tasks),
        currentIteration: result.iteration,
        iterationLimit: result.max_iteration,
        repeatUntil: result.end_time,
        state: result.state,
        id: result.id,
        canEdit: result.can_edit,
        TaskGroupId: result.task_group_id,
      }))
    : []
);
