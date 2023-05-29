import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<any> = ({
  children,
  Component: { isOnlyAuth, isOnlyAdmin, isOnlySeller, isOnlyClient },
}) => {
  const { pathname, asPath } = useRouter();

  useEffect(() => {
    if (status === 'loading') return null;
    (async () => {
      try {
      } catch (e) {
        console.log(e);
      }
    })();
  }, [pathname, asPath, status]);

  return !isOnlyAdmin && !isOnlyAuth && !isOnlySeller && !isOnlyClient ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyAuth, isOnlySeller, isOnlyClient }}>
      {children}
    </DynamicCheckRole>
  );
};

export default AuthProvider;
