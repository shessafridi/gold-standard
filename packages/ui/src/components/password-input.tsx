import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import type { Input } from './input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './input-group';

function PasswordInput({ ...props }: React.ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { PasswordInput };
