import type { DialogRootActions } from '@base-ui/react';
import type { ReactElement } from 'react';
import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

type Props = {
  trigger: ReactElement;
  onAccept?: () => void;
  message?: string;
  description?: string;
  yesLabel?: string;
  noLabel?: string;
  actionTriggerVariant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | 'neutral'
    | 'neutral-inverted'
    | 'outline2'
    | 'none'
    | null
    | undefined;
  busy?: boolean;
};
export const ConfirmDialog = ({
  trigger,
  message = 'Are you sure ?',
  description,
  onAccept,
  yesLabel = 'Yes',
  noLabel = 'No',
  actionTriggerVariant = 'destructive',
  busy = false,
}: Props) => {
  const actionRef = useRef<DialogRootActions | null>(null);
  return (
    <AlertDialog actionsRef={actionRef}>
      <AlertDialogTrigger disabled={busy} render={trigger} />
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>{noLabel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={busy}
            variant={actionTriggerVariant}
            onClick={() => {
              actionRef.current?.close();
              onAccept?.();
            }}
          >
            {yesLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
