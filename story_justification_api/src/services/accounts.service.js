import {userRepository} from '../repositories';
import {userValidator} from '../validators';

export default {
  login: async (payload) => {
    const validatedData = await userValidator.login.validateAsync(payload);
    return userRepository.login(validatedData);
  },
  detail: async (user) => {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      dateJoined: user.dateJoined,
    };
  },
  logout: (user) => {
    return userRepository.logout(user);
  },
};
