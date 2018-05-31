import _ from 'lodash';
import mongoose from 'mongoose';

import generateSlug from '../utils/slugify';
// import sendEmail from '../sendEmail';
import sendEmail from '../aws';
import getEmailTemplate from './EmailTemplate';
import logger from '../logs';

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  displayName: String,
  avatarUrl: String,

  isGithubConnected: {
    type: Boolean,
    default: false,
  },
  githubAccessToken: {
    type: String,
  },
  purchasedBookIds: [String],
});

class UserClass {
  static publicFields() {
    return [
      'id',
      'displayName',
      'email',
      'avatarUrl',
      'slug',
      'isAdmin',
      'isGithubConnected',
      'purchasedBookIds',
    ];
  }
  // signInOrSignUp() will wait for
  static async signInOrSignUp({
    googleId, email, googleToken, displayName, avatarUrl,
  }) {
    // this.findOne() and if a user exist then it will wait for
    const user = await this.findOne({ googleId }).select(UserClass.publicFields().join(' '));

    if (user) {
      const modifier = {};
      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken;
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refreshToken;
      }

      if (_.isEmpty(modifier)) {
        return user;
      }
      // this.updateOne() to update the users tokens, but if user !== exist, it will wait for
      await this.updateOne({ googleId }, { $set: modifier });

      return user;
    }
    // generateSlug() and then will wait for
    const slug = await generateSlug(this, displayName);

    // this.create()
    const newUser = await this.create({
      createdAt: new Date(),
      googleId,
      email,
      googleToken,
      displayName,
      avatarUrl,
      slug,
    });

    // Make `signInOrSignUp()` wait for `getEmailTemplate()` to return the template
    const template = await getEmailTemplate('welcome', {
      // pass userName to getEmailTemplate() so that {{userName}} get an actual val
      userName: displayName,
    });

    try {
      // wait(await) for the `sendEmail()` to send an email. Pass the template
      // from `getEmailTemplate()` to `sendEmail()`
      await sendEmail({
        from: `Ruben from The Lib <${process.env.EMAIL_SUPPORT_FROM_ADDRESS}>`,
        // email is a string but being passed as an array due to AWS SES API Guidelines,
        //  or [user.email]?
        to: [email],
        subject: template.subject,
        body: template.message,
      });
    } catch (err) {
      // Output errors from `sendEmail()`, the rest of the errors that belong
      // to `signInOrSignUp()`are being caught @ server/google.js
      logger.error('Email sending error:', err);
    }

    return _.pick(newUser, UserClass.publicFields());
  }
}

userSchema.loadClass(UserClass);

const User = mongoose.model('User', userSchema);

export default User;
