import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRequest, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, delete_request_received }) =>
      deleteUser(id, delete_request_received),

    onSuccess: () => {
      toast.success('User successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRequest };
};
