import { TypeComponentAuthFields } from '@/types/auth.types';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';
const CheckRole: FC<TypeComponentAuthFields> = ({
  children,
  Component: { is_auth, is_not_auth, is_author },
}) => {
  const router = useRouter();

  const Children = () => <>{children}</>;

  return null;
};

export default CheckRole;
