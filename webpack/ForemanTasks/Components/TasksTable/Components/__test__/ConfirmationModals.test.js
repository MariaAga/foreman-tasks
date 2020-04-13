import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { CANCEL_SELECTED } from '../../TasksTableConstants';
import { ConfirmationModals } from '../ConfirmationModals';

const fixtures = {
  'renders ConfirmationModals': {
    setModalClosed: jest.fn(),
    modalID: CANCEL_SELECTED,
    selectedRowsLen: 7,
    tasksActions: {
      cancelTask: jest.fn(),
      resumeTask: jest.fn(),
      cancelSelectedTasks: jest.fn(),
      resumeSelectedTasks: jest.fn(),
    },
  },
};

describe('ConfirmationModals', () =>
  testComponentSnapshotsWithFixtures(ConfirmationModals, fixtures));
