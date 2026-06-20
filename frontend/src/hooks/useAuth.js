import { useLoginMutation, useRegisterMutation, useGetUserProfileQuery } from '../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const loginUser = async (email, password) => {
    const res = await login({ email, password }).unwrap();
    if (res) {
      dispatch(setCredentials(res));
      return { success: true, message: 'Uspešno prijavljen' };
    }
    return { success: false, message: 'Greška pri prijavi' };
  };

  const registerUser = async (firstName, lastName, email, password) => {
    const name = `${firstName} ${lastName}`;
    const res = await register({ name, email, password }).unwrap();
    if (res) {
      dispatch(setCredentials(res));
      return { success: true, message: 'Uspešno registrovan' };
    }
    return { success: false, message: 'Greška pri registraciji' };
  };

  return { loginUser, registerUser };
};
