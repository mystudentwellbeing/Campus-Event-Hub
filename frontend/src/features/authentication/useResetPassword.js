import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { resetPassword as resetPasswordApi } from '../../services/apiAuth';

export const useResetPassword = () => {
  const { mutate: resetPassword, isLoading: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success('Please check your email for password reset instructions.');
    },
    onError: (err) => toast.error(err.message),
  });

  return { resetPassword, isResetting };
};
