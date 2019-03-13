import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';
import { noop } from '../../../helpers';
import StoppedTasksCard from './StoppedTasksCard';

const createRequiredProps = () => ({
  error: {
    total: 8,
    last: 1,
  },
  warning: {
    total: 20,
    last: 2,
  },
  success: {
    total: 25,
    last: 3,
  },
  updateQuery: noop,
});

const fixtures = {
  'render with minimal props': { updateQuery: noop },
  'render with props': { ...createRequiredProps() },
};

describe('StoppedTasksCard', () =>
  testComponentSnapshotsWithFixtures(StoppedTasksCard, fixtures));
