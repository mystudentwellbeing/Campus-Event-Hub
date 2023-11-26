import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditEvent } from '../../services/apiEvents';
import { toast } from 'react-hot-toast';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createEditEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Event submitted!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createEvent: mutate, isCreating: isLoading };
};
