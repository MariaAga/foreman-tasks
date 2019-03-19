import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withCardsDecorator } from '../../../../../stories/decorators';

import TasksDonutCard from './TasksDonutCard';

storiesOf('TasksDashboard', module)
  .addDecorator(withKnobs)
  .addDecorator(withCardsDecorator)
  .add('TasksDonutCard', () => (
    <TasksDonutCard
      title={text('title', 'Some Title')}
      last={number('last', 3)}
      older={number('older', 5)}
      timePeriod={text('timePeriod', '24h')}
      focusedOn={object('focusedOn', {
        normal: true,
        total: false,
        older: false,
        last: false,
      })}
      onTotalClick={action('onTotalClick')}
      onLastClick={action('onLastClick')}
      onOlderClick={action('onOlderClick')}
    />
  ));