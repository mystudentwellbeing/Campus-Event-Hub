import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
};

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();

//   const { mutate: updateUser, isLoading: isUpdating } = useMutation({
//     mutationFn: updateCurrentUser,
//     onSuccess: (data, variables, context) => {
//       if (context.successCallback) {
//         context.successCallback(data.user);
//       }
//       queryClient.setQueryData(['user'], data.user);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { updateUser, isUpdating };
// };
