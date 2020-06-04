import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { STATUS } from 'foremanReact/constants';
import RecurringLogicsTable from '../RecurringLogicsTable';

jest.mock('../RecurringLogicsSchema');

const recurringLogics = [{ logic: 1 }];
const fixtures = {
  'render with no Props': {},
  'render with no recurringLogics': {
    recurringLogics: [],
    status: STATUS.RESOLVED,
  },
  'render with error Props': {
    error: 'some error message',
    status: STATUS.ERROR,
  },
  'render pending': {
    status: STATUS.PENDING,
  },
  'render with recurringLogics': {
    recurringLogics,
    status: STATUS.RESOLVED,
  },
};

describe('RecurringLogicsTable', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(RecurringLogicsTable, fixtures));
});
