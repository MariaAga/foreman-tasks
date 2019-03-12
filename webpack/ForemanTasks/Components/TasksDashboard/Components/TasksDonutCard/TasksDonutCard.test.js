import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';

import TasksDonutCard from './TasksDonutCard';

const createRequiredProps = () => ({ last: 3, older: 5 });

const fixtures = {
  'render with minimal props': { ...createRequiredProps() },
  'render with props': {
    ...createRequiredProps(),
    title: 'some title',
    className: 'some-classname',
    focusedOn: 'normal',
    onTotalClick: jest.fn(),
  },
};

TasksDonutCard.focusedOnOptions.forEach(mode => {
  fixtures[`render with focused-on ${mode}`] = {
    ...createRequiredProps(),
    focusedOn: mode,
  };
});

describe('TasksDonutCard', () =>
  testComponentSnapshotsWithFixtures(TasksDonutCard, fixtures));
