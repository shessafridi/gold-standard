import type React from 'react';

import { InputGroup, InputGroupInput } from './input-group';

type Props = {
  children?: React.ReactNode;
} & React.ComponentProps<typeof InputGroupInput>;

function GroupInput({ children, ...props }: Props) {
  return (
    <InputGroup>
      <InputGroupInput {...props} />
      {children}
    </InputGroup>
  );
}

export default GroupInput;
