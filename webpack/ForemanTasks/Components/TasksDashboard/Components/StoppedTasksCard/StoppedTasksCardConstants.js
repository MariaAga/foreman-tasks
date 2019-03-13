export const STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS = {
  NORMAL: 'normal', // normal-mode
  ERROR_TOTAL: 'error-total-stopped', // error total-mode
  ERROR_LAST: 'error-last-stopped', // error last X mode
  WARNING_TOTAL: 'warning-total-stopped', // warning total-mode
  WARNING_LAST: 'warning-last-stopped', // warning last X mode
  SUCCESS_TOTAL: 'success-total-stopped', // success total-mode
  SUCCESS_LAST: 'success-last-stopped', // success last X mode
  NONE: 'none', // unfocus-mode: another card is selected
};

export const STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS_ARRAY = Object.values(
  STOPPED_TASK_CARD_FOCUSED_ON_OPTIONS
);
