import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TasksTable from './TasksTable';
import reducer from './TasksTableReducer';
import * as actions from './TasksTableActions';
import { selectResults, selectTasksTable } from './TasksTableSelectors';

const mapStateToProps = state => ({
  ...selectTasksTable(state),
  results: selectResults(state),
});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const reducers = { tasksTable: reducer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTable);
