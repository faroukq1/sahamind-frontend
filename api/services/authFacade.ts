import * as AuthAPI from '../auth';

export const AuthFacade = {
  login: async (email: string, password: string) => {
    try {
      const data = await AuthAPI.loginRequest(email, password);
      return data;
    } catch (error: any) {
      console.log(error);
      throw error.response?.data || { error: "Something went wrong" };
    }
  },

  register: async (
    email: string,
    password: string,
    username: string,
    role: string
  ) => {
    try {
      const data = await AuthAPI.registerRequest(email, password, username, role);
      return data;
    } catch (error: any) {
      console.log(error);
      throw error.response?.data || { error: "Something went wrong" };
    }
  },
};
