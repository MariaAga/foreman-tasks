export const getLastOccurrence = tasks => {
  const filteredTasks = [...tasks].filter(task => !!task.started_at);
  if (!filteredTasks.length) return '-';
  const lastTask = filteredTasks.sort((a, b) =>
    a.started_at < b.started_at ? 1 : -1
  )[0];
  return lastTask.started_at || '-';
};

export const getNextOccurrence = (state, tasks) => {
  const defaultLastOccurrence = '-';
  if (['cancelled', 'finished', 'disabled'].includes(state) || !tasks.length)
    return defaultLastOccurrence;
  const tasksList = [...tasks];
  const lastTask = tasksList.sort((a, b) =>
    a.start_at < b.start_at ? 1 : -1
  )[0];
  return lastTask.start_at;
};
