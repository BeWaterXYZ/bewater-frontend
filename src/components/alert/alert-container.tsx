import { Alert as AlertComponent } from './alert';
import type { Alert } from './store';

interface AlertContainerProps {
  alert?: Alert;
}

export function AlertContainer({ alert }: AlertContainerProps) {
  console.log('AlertContainer', alert);
  return alert ? <AlertComponent alert={alert} /> : null;
}
