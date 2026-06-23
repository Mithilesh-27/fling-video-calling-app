import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../controllers/auth.controller";

const useRegister = () => {
  const queryClient = useQueryClient();

  const { mutate: registerMutation, isPending, error } = useMutation({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, registerMutation };
};
export default useRegister;