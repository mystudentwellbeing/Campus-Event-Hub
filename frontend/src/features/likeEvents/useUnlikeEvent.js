import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unlikeEvent } from '../../services/apiEventInterests';
import { toast } from 'react-hot-toast';

export const useUnlikeEvent = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: unlikeEvent,
    onSuccess: () => {
      toast.success('Event unliked!');
      queryClient.invalidateQueries(['eventInterest']);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { unlikeEvent: mutate, isUnliking: isLoading };
};
