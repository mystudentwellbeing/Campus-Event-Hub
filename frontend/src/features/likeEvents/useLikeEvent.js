import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeEvent } from '../../services/apiEventInterests';
import { toast } from 'react-hot-toast';

export const useLikeEvent = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: likeEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['eventInterest']);
      toast.success('Event liked!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { likeEvent: mutate, isLiking: isLoading };
};
