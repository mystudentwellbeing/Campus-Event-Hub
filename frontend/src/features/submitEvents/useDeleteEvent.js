import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvent } from '../../services/apiEvents';
import { toast } from 'react-hot-toast';

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Event deleted!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteEvent: mutate, isDeleting: isLoading };
};
