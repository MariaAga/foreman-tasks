import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'patternfly-react';
import classNames from 'classnames';

import {
  SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS_ARRAY,
  SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS,
} from './ScheduledTasksCardConstants';
import './ScheduledTasksCard.scss';
import TasksDonutCard from '../TasksDonutCard/TasksDonutCard';

class ScheduledTasksCard extends React.Component {
  onClick = () => {
    this.props.updateQuery({
      state: 'scheduled',
    });
  };
  render() {
    const { className, scheduled, focusedOn } = this.props;

    return (
      <Card
        className={classNames(
          'tasks-donut-card',
          'scheduled-tasks-card',
          className
        )}
      >
        <Card.Title>Scheduled</Card.Title>
        <Card.Body>
          <div
            className={`scheduled-data ${
              focusedOn === SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS.NONE
                ? 'not-focused'
                : ''
            }`}
            onClick={this.onClick}
          >
            {scheduled}
            <Icon type="fa" name="clock-o" />
          </div>
        </Card.Body>
      </Card>
    );
  }
}

const filterTitle = obj => {
  const { title, ...newObj } = obj;
  return newObj;
};

ScheduledTasksCard.propTypes = filterTitle(TasksDonutCard.propTypes);
ScheduledTasksCard.defaultProps = filterTitle(TasksDonutCard.defaultProps);

ScheduledTasksCard.propTypes = {
  className: PropTypes.string,
  focusedOn: PropTypes.oneOf(SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS_ARRAY),
  scheduled: PropTypes.number,
  updateQuery: PropTypes.func.isRequired,
};

ScheduledTasksCard.defaultProps = {
  title: '',
  className: '',
  focusedOn: SCHEDULED_TASK_CARD_FOCUSED_ON_OPTIONS.NORMAL,
  scheduled: 0,
};

export default ScheduledTasksCard;
