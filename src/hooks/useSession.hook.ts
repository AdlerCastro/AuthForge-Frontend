import { getSessionUser } from '@/actions/getSession.actions';
import { useQuery } from '@tanstack/react-query';
import { UserResponse } from '@/types/responseUser.type';

export function useSession(): {
  session: UserResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
} {
  const {
    data: session,
    isLoading,
    isError,
    refetch,
  } = useQuery<UserResponse>({
    queryKey: ['session'],
    queryFn: getSessionUser,
    retry: false,
  });

  return {
    session,
    isLoading,
    isError,
    refetch,
  };
}
