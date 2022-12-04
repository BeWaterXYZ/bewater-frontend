import { useCallback, useState } from 'react';
import { useTimeoutFn } from 'react-use';

import { Snackbar } from '../snackbar';

type Params = {
  title: string;
  text?: string;
  autoCloseTimeout?: number;
};

export function useAlert({ title, text, autoCloseTimeout = 10000 }: Params) {
  const [show, setShow] = useState(false);
  const [t] = useState(title);
  const [d, setD] = useState(text);

  const [_, cancel, reset] = useTimeoutFn(() => {
    setShow(false);
  }, autoCloseTimeout);

  const handleClose = useCallback(() => {
    setShow(false);
    cancel();
  }, [cancel]);

  const handleAlert = useCallback(
    (text?: string) => {
      if (text) {
        setD(text);
      }
      setShow(true);
      reset();
    },
    [reset],
  );

  const Alert = useCallback(
    () => <Snackbar open={show} title={t} text={d} onClose={handleClose} />,
    [show, d, t, handleClose],
  );

  return { Alert, onAlert: handleAlert };
}
