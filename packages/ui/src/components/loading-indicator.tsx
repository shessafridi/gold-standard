import { cn } from '../lib/utils';
import { Spinner } from './spinner';

type Props = {
  className?: string;
};

export function LoadingIndicator({ className }: Props) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Spinner />
    </div>
  );
}
