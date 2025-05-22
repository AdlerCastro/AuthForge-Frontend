import { getSessionUser } from '@/actions/getSessionUser.actions';
import { useQuery } from '@tanstack/react-query';

export function useSession() {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['session'],
    queryFn: getSessionUser,
    retry: false,
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    refetch,
  };
}
