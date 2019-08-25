import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';

import TaskDetailsPage from '../TaskDetailsPage';

const fixtures = {
  'render without Props': {},
};

describe('TaskDetailsPage', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(TaskDetailsPage, fixtures));
});
