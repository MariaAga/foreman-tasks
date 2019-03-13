import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'patternfly-react';
import classNames from 'classnames';
import './ScheduledTasksCard.scss';

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
          className,
          {
            'selected-tasks-card': focusedOn && focusedOn.total,
          }
        )}
      >
        <Card.Title onClick={this.onClick}>Scheduled</Card.Title>
        <Card.Body>
          <div
            className={classNames('scheduled-data', {
              'not-focused': !(
                focusedOn &&
                (focusedOn.total || focusedOn.normal)
              ),
            })}
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

ScheduledTasksCard.propTypes = {
  className: PropTypes.string,
  focusedOn: PropTypes.shape({ total: PropTypes.bool, normal: PropTypes.bool }),
  scheduled: PropTypes.number,
  updateQuery: PropTypes.func.isRequired,
};

ScheduledTasksCard.defaultProps = {
  className: '',
  focusedOn: {},
  scheduled: 0,
};

export default ScheduledTasksCard;
