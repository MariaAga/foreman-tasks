import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'patternfly-react';
import classNames from 'classnames';

import {
  STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS_ARRAY,
  STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS,
} from './StoppedTasksCardConstants';
import './StoppedTasksCard.scss';
import TasksDonutCard from '../TasksDonutCard/TasksDonutCard';

class StoppedTasksCard extends React.Component {
  state = {
    focusedOn: this.props.focusedOn,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.focusedOn !== prevProps.focusedOn) {
      this.setFocused(this.props.focusedOn);
    }
  }
  setFocused = focus => {
    this.setState({ focusedOn: focus });
  };
  getTableItemClassName = (item, type) =>
    this.state.focusedOn === 'normal' ||
    this.state.focusedOn === `${item}-${type}-stopped`
      ? `${type}-data`
      : 'not-focused';
  onTableItemClick = (item, type) => {
    this.setState({ focusedOn: `${item}-${type}-stopped` });
    this.props.updateQuery({
      state: 'stopped',
      result: item,
      time: type,
    });
  };
  render() {
    const { className, error, warning, success, timePeriod } = this.props;
    const data = { error, warning, success };

    return (
      <Card
        className={classNames(
          'tasks-donut-card',
          'stopped-tasks-card',
          className
        )}
      >
        <Card.Title>Stopped</Card.Title>
        <Card.Body>
          <table className="table table-titles">
            <tbody>
              <tr>
                <td />
                <td>Total</td>
                <td>{timePeriod}</td>
              </tr>
            </tbody>
          </table>
          <table className="table table-bordered table-striped">
            <tbody>
              {Object.keys(data).map((item, index) => (
                <tr className={`${item}-row`} key={index}>
                  <td>{item[0].toUpperCase() + item.slice(1)}</td>
                  <td
                    className={this.getTableItemClassName(item, 'total')}
                    onClick={() => {
                      this.onTableItemClick(item, 'total');
                    }}
                  >
                    {data[item].total}
                  </td>
                  <td
                    className={this.getTableItemClassName(item, 'last')}
                    onClick={() => {
                      this.onTableItemClick(item, 'last');
                    }}
                  >
                    {data[item].last}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

const filterTitle = obj => {
  const { title, ...newObj } = obj;
  return newObj;
};

StoppedTasksCard.propTypes = filterTitle(TasksDonutCard.propTypes);
StoppedTasksCard.defaultProps = filterTitle(TasksDonutCard.defaultProps);

StoppedTasksCard.propTypes = {
  className: PropTypes.string,
  focusedOn: PropTypes.oneOf(STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS_ARRAY),
  error: PropTypes.shape({ total: PropTypes.number, last: PropTypes.number }),
  warning: PropTypes.shape({ total: PropTypes.number, last: PropTypes.number }),
  success: PropTypes.shape({ total: PropTypes.number, last: PropTypes.number }),
  timePeriod: PropTypes.string,
  updateQuery: PropTypes.func.isRequired,
};

StoppedTasksCard.defaultProps = {
  title: '',
  className: '',
  focusedOn: STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS.NORMAL,
  error: { total: 0, last: 0 },
  warning: { total: 0, last: 0 },
  success: { total: 0, last: 0 },
  timePeriod: '24h',
};

export default StoppedTasksCard;
