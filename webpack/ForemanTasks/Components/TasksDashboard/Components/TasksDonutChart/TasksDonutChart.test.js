import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';

import TasksDonutChart from './TasksDonutChart';

jest.mock('./TasksDonutChartHelper', () => ({
  baseChartConfig: () => ({ base: 'some-base-config' }),
  createChartData: jest.fn(() => ({
    columns: 'some-columns',
    names: 'some-names',
    onItemClick: jest.fn(),
  })),
  updateChartTitle: jest.fn(),
}));

const createRequiredProps = () => ({ last: 3, older: 5 });

const fixtures = {
  'render with minimal props': { ...createRequiredProps() },
  'render with props': {
    ...createRequiredProps(),
    className: 'some-class',
    timePeriod: 'time-period',
    colorsPattern: ['color1', 'color2'],
    onTotalClick: jest.fn(),
    onLastClick: jest.fn(),
    onOlderClick: jest.fn(),
  },
};

TasksDonutChart.focusedOnOptions.forEach(mode => {
  fixtures[`render with focused-on ${mode}`] = {
    ...createRequiredProps(),
    focusedOn: mode,
  };
});

describe('TasksDonutChart', () =>
  testComponentSnapshotsWithFixtures(TasksDonutChart, fixtures));
