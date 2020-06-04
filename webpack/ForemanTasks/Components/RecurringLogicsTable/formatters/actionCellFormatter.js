import React from 'react';
import { cellFormatter } from 'foremanReact/components/common/table';
import { translate as __ } from 'foremanReact/common/I18n';
import { ActionButtons } from 'foremanReact/components/common/ActionButtons/ActionButtons';

export const actionCellFormatter = () => (
  canEdit,
  { rowData: { id, state } }
) => {
  const buttons = [];
  if (canEdit) {
    if (state === 'disabled') {
      buttons.push({
        title: __('Enable'),
        action: {
          rel: 'nofollow',
          'data-method': 'put',
          href: `/foreman_tasks/recurring_logics/${id}/enable`,
          id: `enable-button-${id}`,
        },
      });
    }
    if (state !== 'cancelled' && state !== 'finished' && state !== 'disabled') {
      buttons.push({
        title: __('Disable'),
        action: {
          rel: 'nofollow',
          'data-method': 'put',
          href: `/foreman_tasks/recurring_logics/${id}/disable`,
          id: `disable-button-${id}`,
        },
      });
    }
    if (state !== 'cancelled' && state !== 'finished') {
      buttons.push({
        title: __('Cancel'),
        action: {
          rel: 'nofollow',
          'data-method': 'post',
          href: `/foreman_tasks/recurring_logics/${id}/cancel`,
          id: `cancel-button-${id}`,
        },
      });
    }
  }
  return cellFormatter(<ActionButtons buttons={buttons} />);
};
