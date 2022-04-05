import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { translate as __ } from 'foremanReact/common/I18n';
import {
  Button,
  Checkbox,
  ActionList,
  ActionListItem,
} from '@patternfly/react-core';
import { closeConfirmModal } from 'foremanReact/components/ConfirmModal';
import tasksActions from './ConfirmModalActions';

export const ConfirmFooter = ({
  confirmType,
  confirmAction,
  action,
  url,
  query,
  parentTaskID,
  onClick,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="confirmation-check">
        <Checkbox
          label={` ${__(
            'I understand that this may cause harm and have working database backups of all backend services.'
          )}`}
          isChecked={isConfirmed}
          onChange={checked => setIsConfirmed(checked)}
          aria-label="controlled checkbox example"
          id="check-1"
          name="check1"
        />
      </div>
      <ActionList>
        <ActionListItem>
          <Button
            className="confirm-button"
            onClick={() => {
              dispatch(tasksActions[action]({ url, query, parentTaskID }));
              dispatch(closeConfirmModal());
            }}
            variant={confirmType}
            isDisabled={!isConfirmed}
          >
            {confirmAction}
          </Button>
        </ActionListItem>
        <ActionListItem>
          <Button onClick={() => dispatch(closeConfirmModal())}>
            {__('Cancel')}
          </Button>
        </ActionListItem>
      </ActionList>
    </div>
  );
};

ConfirmFooter.propTypes = {
  confirmType: PropTypes.string.isRequired,
  confirmAction: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  url: PropTypes.string,
  query: PropTypes.object,
  parentTaskID: PropTypes.string,
};

ConfirmFooter.defaultProps = {
  url: null,
  query: null,
  parentTaskID: null,
};
