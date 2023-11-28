import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveEvent } from '../../services/apiEvents';
import { toast } from 'react-hot-toast';

export const useApproveEvent = () => {
  const queryClient = useQueryClient();

  const { mutate: approve, isLoading: isApproving } = useMutation({
    mutationFn: ({ id, is_approved }) => approveEvent(id, is_approved),
    onSuccess: () => {
      toast.success('Event successfully approved');
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isApproving, approve };
};
