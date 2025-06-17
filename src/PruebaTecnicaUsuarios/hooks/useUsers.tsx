import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { User } from "../types";

export const useUsers = () => {
    const {isLoading, isError, data, refetch, fetchNextPage, hasNextPage} = useInfiniteQuery<{ users: User[]; nextCursor?: number }>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5
    })
    return{
        isLoading,
        isError,
        users: data?.pages.flatMap(page => page.users) ?? [],
        refetch,
        fetchNextPage,
        hasNextPage
    }
}