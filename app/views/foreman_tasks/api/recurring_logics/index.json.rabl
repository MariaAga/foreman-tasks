collection @recurring_logics

extends 'foreman_tasks/api/recurring_logics/base'
extends 'api/v2/layouts/permissions'

attributes :max_iteration

child :tasks => :tasks do
  attributes :start_at, :action, :started_at
end
