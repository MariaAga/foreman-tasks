import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import ForemanModal from 'foremanReact/components/ForemanModal';
import { useForemanModal } from 'foremanReact/components/ForemanModal/ForemanModalHooks';

export const ClickConfirmation = ({
  title,
  confirmType,
  body,
  confirmationMessage,
  id,
  confirmAction,
  onClick,
}) => {
  const [isConfirm, setIsConfirm] = useState(true);
  const { modalOpen, setModalClosed } = useForemanModal({
    id,
  });
  useEffect(() => setIsConfirm(false), [modalOpen]);
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
            setIsConfirm(e.target.checked);
          }}
          type="checkbox"
          checked={isConfirm}
        />
        {` ${confirmationMessage}`}
      </div>
      <ForemanModal.Footer>
        <Button
          onClick={() => {
            onClick();
            setModalClosed();
          }}
          bsStyle={confirmType}
          disabled={!isConfirm}
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
  onClick: PropTypes.func.isRequired,
  confirmType: PropTypes.oneOf(['warning', 'danger']),
  id: PropTypes.string.isRequired,
};

ClickConfirmation.defaultProps = {
  confirmType: 'warning',
};

export default ClickConfirmation;
