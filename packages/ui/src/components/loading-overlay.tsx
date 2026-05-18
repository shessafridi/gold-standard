import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import { Spinner } from './spinner';

type Props = { open: boolean; title?: string; description?: string };

export function LoadingOverlay({
  open,
  title = 'Please Wait',
  description,
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className='text-center'>{title}</AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription className='text-center'>
              {description}
            </AlertDialogDescription>
          )}
          <div className='flex w-full justify-center pt-4'>
            <Spinner />
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
