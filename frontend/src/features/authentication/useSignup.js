import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export const useSignup = () => {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('Account successfully created!');
      navigate('/', { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
};
