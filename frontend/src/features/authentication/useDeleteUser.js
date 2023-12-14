import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser as deleteUserApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, delete_request_received }) =>
      deleteUserApi(id, delete_request_received),

    onSuccess: () => {
      toast.success('Delete request sent!');
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
};
