import React from 'react';
import {
  column,
  headerFormatterWithProps,
  cellFormatter,
} from 'foremanReact/components/common/table';
import { translate as __ } from 'foremanReact/common/I18n';
import { actionNameCellFormatter } from '../TasksTable/formatters';
import {
  taskCountCellFormatter,
  stateFormatter,
  actionCellFormatter,
} from './formatters';

const headFormat = [headerFormatterWithProps];
const cellFormat = [cellFormatter];

export const limitCellFormatter = limit =>
  cellFormatter(limit || <i>{__('Unlimited')}</i>);

const createTasksTableSchema = () => [
  column('cronLine', __('Cron line'), headFormat, [
    actionNameCellFormatter('foreman_tasks/recurring_logics'),
  ]),
  column('taskCount', __('Task count'), headFormat, [taskCountCellFormatter]),
  column('action', __('Action'), headFormat, cellFormat),
  column('lastOccurrence', __('Last occurrence'), headFormat, cellFormat),
  column('nextOccurrence', __('Next occurrence'), headFormat, cellFormat),
  column('currentIteration', __('Current iteration'), headFormat, cellFormat),
  column('iterationLimit', __('Iteration limit'), headFormat, [
    limitCellFormatter,
  ]),
  column('repeatUntil', __('Repeat until'), headFormat, [limitCellFormatter]),
  column('state', __('State'), headFormat, [stateFormatter]),
  column('canEdit', __(' '), headFormat, [actionCellFormatter()]),
];

export default createTasksTableSchema;
