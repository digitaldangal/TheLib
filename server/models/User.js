import _ from 'lodash';
import mongoose from 'mongoose';
import generateSlug from '../utils/slugify';
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const mongoSchema = new Schema({
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
    ];
  }

  static signInOrSignUp({
    googleId, email, googleToken, displayName, avatarUrl,
  }) {
    return this.findOne({ googleId }, UserClass.publicFields().join(' ')).then((user) => {
      if (user) {
        const modifier = {};

        if (googleToken.accessToken) {
          modifier.access_token = googleToken.accessToken;
        }

        if (googleToken.refreshToken) {
          modifier.refresh_token = googleToken.refreshToken;
        }

        if (isEmpty(modifier)) {
          return Promise.resolve(user);
        }

        return this.updateOne({ googleId }, { $set: modifier }).then(() => Promise.resolve(user));
      }

      const userCount = this.find().count();

      return generateSlug(displayName).then(slug =>
        this.create({
          createdAt: new Date(),
          googleId,
          email,
          googleToken,
          displayName,
          avatarUrl,
          slug,
          isAdmin: userCount === 0,
        }).then(newUser => Promise.resolve(pick(newUser, UserClass.publicFields()))));
    });
  }
}

mongoSchema.loadClass(UserClass);
const User = mongoose.model('User', mongoSchema);

export default User;


// TODO:
// integrate Google OAuth
// integrate Github Auth
// Switch from Promise.then to async/await

