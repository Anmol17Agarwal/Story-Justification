import mongoose from 'mongoose';

import {User} from '../models';
import {MONGODB_URI} from '../settings';
import {userValidator} from '../validators';

/**
 * Create super user in CLI.
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} password
 */
export default async function createSuperUser(
    email,
    firstName,
    lastName,
    password,
) {
  const args = {email, firstName, lastName, password};
  const validatedData = await userValidator.createSuperUser.validateAsync(args);
  const newUser = new User({...validatedData, isAdmin: true});
  await mongoose.connect(MONGODB_URI);
  await newUser.save();
  console.info('Super User Created Successfully!');
}
