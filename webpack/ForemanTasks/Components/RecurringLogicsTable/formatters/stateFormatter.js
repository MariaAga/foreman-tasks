import React from 'react';
import { cellFormatter } from 'foremanReact/components/common/table';
import { translate as __ } from 'foremanReact/common/I18n';

const formatText = state => {
  switch (state) {
    case 'active':
      return __('Active');
    case 'cancelled':
      return __('Cancelled');
    case 'finished':
      return __('Finished');
    case 'disabled':
      return __('Disabled');
    default:
      return __('N/A');
  }
};

export const stateFormatter = state => {
  const icons = {
    active: 'glyphicon-info-sign',
    disabled: 'glyphicon-pause',
    finished: 'glyphicon-ok-sign',
    cancelled: 'glyphicon-warning-sign',
  };
  const status = {
    finished: 'status-ok',
    cancelled: 'status-error',
  };
  const defaultIcon = 'glyphicon-question-sign';
  return cellFormatter(
    <React.Fragment>
      <i className={`glyphicon ${icons[state] || defaultIcon}`} />
      <span className={status[state]}>{formatText(state)}</span>
    </React.Fragment>
  );
};
