import {
  testActionSnapshotWithFixtures,
  IntegrationTestHelper,
} from '@theforeman/test';
import API from 'foremanReact/API';
import { TASKS_TABLE_ID } from '../TasksTableConstants';
import {
  getTableItems,
  cancelTask,
  cancelTaskRequest,
  resumeTask,
  resumeTaskRequest,
  selectPage,
} from '../TasksTableActions';

jest.mock('foremanReact/components/common/table', () => ({
  getTableItemsAction: jest.fn(controller => controller),
}));

jest.mock('foremanReact/API');

API.post.mockImplementation(() => ({ data: 'some-data' }));

const taskInfo = {
  taskId: 'some-id',
  taskName: 'some-name',
};

const fixtures = {
  'should cancelTaskRequest and succeed': () =>
    cancelTaskRequest('some-id', 'some-name'),
  'should cancelTaskRequest and fail': () => {
    API.post.mockImplementation(() =>
      Promise.reject(new Error('Network Error'))
    );
    return cancelTaskRequest('some-id', 'some-name');
  },

  'should resumeTaskRequest and succeed': () => {
    API.post.mockImplementation(() => ({ data: 'some-data' }));
    return resumeTaskRequest('some-id', 'some-name');
  },
  'should resumeTaskRequest and fail': () => {
    API.post.mockImplementation(() =>
      Promise.reject(new Error('Network Error'))
    );
    return resumeTaskRequest('some-id', 'some-name');
  },
  'should selectPage and succeed': () => selectPage([{ id: 'some-id' }]),
};
describe('TasksTable actions', () => {
  it('getTableItems should reuse common/table/getTableItemsAction', () => {
    expect(getTableItems('')).toEqual(TASKS_TABLE_ID);
  });

  it('should resumeTask', async () => {
    const dispatch = jest.fn();
    resumeTask({ ...taskInfo, url: 'some-url' })(dispatch);
    await IntegrationTestHelper.flushAllPromises();
    expect(dispatch.mock.calls).toHaveLength(3);
  });
  it('should cancelTask', async () => {
    const dispatch = jest.fn();
    cancelTask({ ...taskInfo, url: 'some-url' })(dispatch);
    await IntegrationTestHelper.flushAllPromises();
    expect(dispatch.mock.calls).toHaveLength(3);
  });
  testActionSnapshotWithFixtures(fixtures);
});
