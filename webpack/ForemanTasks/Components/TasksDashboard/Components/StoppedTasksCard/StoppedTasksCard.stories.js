import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withCardsDecorator } from '../../../../../stories/decorators';

import {
  TASKS_DASHBOARD_AVAILABLE_TIMES,
  TASKS_DASHBOARD_AVAILABLE_QUERY_STATES,
  TASKS_DASHBOARD_AVAILABLE_QUERY_RESULTS,
  TASKS_DASHBOARD_AVAILABLE_QUERY_MODES,
} from '../../TasksDashboardConstants';
import StoppedTasksCard from './StoppedTasksCard';

storiesOf('TasksDashboard', module)
  .addDecorator(withKnobs)
  .addDecorator(withCardsDecorator)
  .add('StoppedTasksCard', () => {
    const selectTime = select(
      'time',
      TASKS_DASHBOARD_AVAILABLE_TIMES,
      StoppedTasksCard.defaultProps.time
    );
    const selectState = select(
      'query.state',
      { ...TASKS_DASHBOARD_AVAILABLE_QUERY_STATES, NONE: 'none' },
      'none'
    );
    const selectResult = select(
      'query.result',
      { ...TASKS_DASHBOARD_AVAILABLE_QUERY_RESULTS, NONE: 'none' },
      'none'
    );
    const selectMode = select(
      'query.mode',
      { ...TASKS_DASHBOARD_AVAILABLE_QUERY_MODES, NONE: 'none' },
      'none'
    );
    return (
      <StoppedTasksCard
        data={{
          error: {
            total: number('errorTotal', 8),
            last: number('errorLast', 1),
          },
          warning: {
            total: number('warningTotal', 20),
            last: number('warningLast', 2),
          },
          success: {
            total: number('successTotal', 25),
            last: number('successLast', 3),
          },
        }}
        time={selectTime}
        query={{
          state: selectState,
          result: selectResult,
          mode: selectMode,
          time: selectTime,
        }}
        updateQuery={action('updateQuery')}
      />
    );
  });
