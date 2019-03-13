import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withCardsDecorator } from '../../../../../stories/decorators';

import { SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS } from './ScheduledTasksCardConstants';
import ScheduledTasksCard from './ScheduledTasksCard';

storiesOf('TasksDashboard', module)
  .addDecorator(withKnobs)
  .addDecorator(withCardsDecorator)
  .add('ScheduledTasksCard', () => (
    <div>
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossOrigin="anonymous"
      />
      <ScheduledTasksCard
        scheduled={number('errorLast', 1)}
        timePeriod={text('timePeriod', '24h')}
        focusedOn={select(
          'focusedOn',
          SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS,
          ScheduledTasksCard.defaultProps.focusedOn
        )}
        updateQuery={action('Update Query')}
      />
    </div>
  ));
