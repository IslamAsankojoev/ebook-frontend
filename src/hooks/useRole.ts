import React from 'react';
import useTypedSession from './useTypedSession';

const useRole = () => {
  const { data, status } = useTypedSession();
  const isNotAuth = status === 'unauthenticated';
  const isAuth = status === 'authenticated';
  const isAuthor = data?.user?.is_author;

  return { isNotAuth, isAuth, isAuthor, status };
};

export default useRole;
