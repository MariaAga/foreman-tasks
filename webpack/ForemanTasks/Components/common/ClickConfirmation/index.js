import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import ForemanModal from 'foremanReact/components/ForemanModal';

export const ClickConfirmation = ({
  title,
  confirmType,
  body,
  confirmationMessage,
  id,
  path,
  confirmAction,
}) => {
  const [disableConfirm, setDisableConfirm] = useState(true);
  const icon = confirmType === 'warning' ? confirmType : 'exclamation';
  return (
    <ForemanModal id={id}>
      <ForemanModal.Header>
        <span className={`glyphicon glyphicon-${icon}-sign`} />
        {` ${title}`}
      </ForemanModal.Header>
      {body}
      <div>
        <input
          onChange={e => {
            setDisableConfirm(!e.target.checked);
          }}
          type="checkbox"
        />
        {` ${confirmationMessage}`}
      </div>
      <ForemanModal.Footer>
        <Button
          href={path}
          data-method="post"
          bsStyle={confirmType}
          disabled={disableConfirm}
        >
          {confirmAction}
        </Button>
      </ForemanModal.Footer>
    </ForemanModal>
  );
};

ClickConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  confirmationMessage: PropTypes.string.isRequired,
  confirmAction: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  confirmType: PropTypes.oneOf(['warning', 'danger']),
  id: PropTypes.string.isRequired,
};

ClickConfirmation.defaultProps = {
  confirmType: 'warning',
};

export default ClickConfirmation;
