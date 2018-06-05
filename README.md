## The Lib

```The Lib is a web application to publish documentation or books. The app is built with React/Material-UI/Next.js/Express/Mongoose/MongoDB and includes 3rd party APIs such as: Google, Github, AWS SES, Mailchimp and Stripe.```

## Live Demo

- Live app:  [thelib.tech](https://thelib.tech/)

## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/Ambition101/TheLib.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

To use all features and third-party integrations (such as Stripe, Google OAuth, Mailchimp, AWS SES), add values to all env variables in your `.env` file:

`.env` :

```
# server/app.js
MONGO_URL="xxxxxx"
MONGO_URL_TEST="xxxxxx"
SESSION_SECRET="xxxxxx"

# server/google.js
Google_clientID="xxxxxx"
Google_clientSecret="xxxxxx"

# server/aws.js
Amazon_accessKeyId="xxxxxx"
Amazon_secretAccessKey="xxxxxx"

# server/models/User.js
EMAIL_SUPPORT_FROM_ADDRESS="xxxxxx"

# server/github.js
Github_Test_ClientID="xxxxxx"
Github_Test_SecretKey="xxxxxx"
Github_Live_ClientID="xxxxxx"
Github_Live_SecretKey="xxxxxx"

# server/stripe.js
Stripe_Test_SecretKey="xxxxxx"
Stripe_Live_SecretKey="xxxxxx"

# server/mailchimp.js
MAILCHIMP_API_KEY="xxxxxx"
MAILCHIMP_REGION="xxxxxx"
MAILCHIMP_SIGNUPS_LIST_ID="xxxxxx"
MAILCHIMP_PURCHASED_LIST_ID="xxxxxx"
MAILCHIMP_TUTORIALS_LIST_ID="xxxxxx"
```

- The _first registered user_ in the app becomes an Admin user (user document gets parameters  `"isAdmin": true`).

## Add a new book
- Create a new Github repo (public or private).
- In that repo, create an `introduction.md` file and write some content.
- At the top of your `introduction.md` file, add metadata in the format shown below.
  
  ```
  ---
  title: Introduction
  seoTitle: title for search engines
  seoDescription: description for search engines
  isFree: true
  ---
  ```

- Go to the app, click "Connect Github".
- Click "Add Book". Enter details and select the Github repo you created.
- Click "Save".

When you add new `.md` files or update content, go to the `BookDetail` page of your app and click `Sync with Github`. 

IMPORTANT: All `.md` files in your Github repo _must_ have metadata in the format shown above.

IMPORTANT: All `.md` files in your Github repo _must_ have name `introduction.md` or `chapter-N.md`.

To make the content of a `.md` file _private_ (meaning a person must purchase the content to see it), remove `isFree:true`  and add `excerpt:""`. Add some excerpt content - this content is public and serves as a free preview.

### Comments in code

Some comments in the source code are personal notes and therefore might not seem necessary from a developer's point of view.

## Built with

#### Core

- [React](https://github.com/facebook/react)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Next](https://github.com/zeit/next.js)
- [Express](https://github.com/expressjs/express)
- [Mongoose](https://github.com/Automattic/mongoose)
- [MongoDB](https://github.com/mongodb/mongo)

#### Third party APIs

- Google OAuth
- Github
- AWS SES
- Stripe
- MailChimp

### Platform

- [ZEIT](https://zeit.co/now)

## License

#### All code in this repository is provided under the [MIT License](./LICENSE)