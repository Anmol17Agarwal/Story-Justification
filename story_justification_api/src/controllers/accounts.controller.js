import {accountService} from '../services';

export default {
  login: async (request, response) => {
    try {
      const data = await accountService.login(request.body);
      if (!data) {
        return response.status(400).json({detail: 'Invalid credentials!'});
      }
      return response.status(201).json(data);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return response.status(400).json(err);
      }
      console.error(err);
      return response.status(500).json({detail: 'Internal Server Error'});
    }
  },
  detail: async (request, response) => {
    const data = await accountService.detail(request.user);
    return response.status(200).json(data);
  },
  logout: async (request, response) => {
    const data = await accountService.logout(request.user);
    return response.status(204).json(data);
  },
};
