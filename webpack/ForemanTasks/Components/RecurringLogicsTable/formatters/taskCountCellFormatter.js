import React from 'react';
import { cellFormatter } from 'foremanReact/components/common/table';

export const taskCountCellFormatter = (value, { rowData: { TaskGroupId } }) =>
  cellFormatter(
    <a href={`/foreman_tasks/tasks/?search=task_group.id=${TaskGroupId}`}>
      {value}
    </a>
  );
