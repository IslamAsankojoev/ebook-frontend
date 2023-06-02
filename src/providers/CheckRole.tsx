import useTypedSession from '@/hooks/useTypedSession';
import { TypeComponentAuthFields } from '@/types/auth.types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, memo, useMemo } from 'react';
const CheckRole: FC<{
  children: JSX.Element;
  Component: TypeComponentAuthFields['Component'];
}> = ({ children, Component: { is_auth, is_not_auth, is_author } }) => {
  const router = useRouter();

  const { data, status } = useTypedSession();
  const Children = () => <>{children}</>;

  const isAuth = status === 'authenticated';
  const isNotAuth = status === 'unauthenticated';
  const isAuthor = data?.user?.is_author;
  const isNotAuthor = !data?.user?.is_author;

  const MemizeComponent = useMemo(() => memo(Children), [children]);

  if (is_auth && isAuth) return <MemizeComponent />;
  if (is_not_auth && isNotAuth) return <MemizeComponent />;
  if (is_author && isAuthor) return <MemizeComponent />;

  if (is_auth && isAuth) return <MemizeComponent />;
  if (is_author && isAuth) return <MemizeComponent />;

  if (is_not_auth && isNotAuth) return <MemizeComponent />;
  if (is_author && isAuthor) return <MemizeComponent />;

  if (is_auth && isNotAuth) {
    router.push('/login');
    return null;
  }
  if (is_not_auth && isAuth) {
    router.push('/');
    return null;
  }
  if (is_author && isNotAuthor) {
    router.push('/');
    return null;
  }

  return null;
};

export default CheckRole;
