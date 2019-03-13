import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withCardsDecorator } from '../../../../../stories/decorators';

import { STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS } from './StoppedTasksCardConstants';
import StoppedTasksCard from './StoppedTasksCard';

storiesOf('TasksDashboard', module)
  .addDecorator(withKnobs)
  .addDecorator(withCardsDecorator)
  .add('StoppedTasksCard', () => (
    <StoppedTasksCard
      error={{
        total: number('errorTotal', 8),
        last: number('errorLast', 1),
      }}
      warning={{
        total: number('warningTotal', 20),
        last: number('warningLast', 2),
      }}
      success={{
        total: number('successTotal', 25),
        last: number('successLast', 3),
      }}
      timePeriod={text('timePeriod', '24h')}
      focusedOn={select(
        'focusedOn',
        STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS,
        StoppedTasksCard.defaultProps.focusedOn
      )}
      updateQuery={action('Update Query')}
    />
  ));
