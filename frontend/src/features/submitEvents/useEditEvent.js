import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditEvent } from '../../services/apiEvents';
import { toast } from 'react-hot-toast';

export const useEditEvent = () => {
  const queryClient = useQueryClient();

  const { mutate: editEvent, isLoading: isEditing } = useMutation({
    mutationFn: ({ newEventData, id }) => createEditEvent(newEventData, id),
    onSuccess: () => {
      toast.success('Event successfully edited');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editEvent };
};
