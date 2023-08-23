import User, { UserType } from "../models/User";

const userService = {
  getAllUsers() {
    return User.find();
  },

  createUser(newUser: UserType) {
    return User.create(newUser);
  },

  async updateUser(userId: string, updatedUser: Partial<UserType>) {
    return User.findByIdAndUpdate(userId, updatedUser, { new: true });
  },

  async deleteUser(userId: string) {
    return User.findByIdAndDelete(userId);
  },
};

export default userService;
