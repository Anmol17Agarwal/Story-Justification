import mongoose from 'mongoose';

import {User} from '../models';
import {MONGODB_URI} from '../settings';
import {userValidator} from '../validators';

/**
 * Change password in CLI.
 * @param {string} email
 * @param {string} password
 */
export default async function changePassword(email, password) {
  const args = {email, password};
  const validatedData = await userValidator.login.validateAsync(args);
  await mongoose.connect(MONGODB_URI);
  const newUser = await User.findOneAndUpdate(
      {email: validatedData.email},
      {password: validatedData.password},
  );
  await newUser.save();
  console.info('Password Changed Successfully!');
}
