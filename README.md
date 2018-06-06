# The Lib

![image](https://user-images.githubusercontent.com/20441870/41067358-49040f56-69b3-11e8-857b-7aaa9c8d275c.png)

![image](https://user-images.githubusercontent.com/20441870/41067589-3311b418-69b4-11e8-820e-662c175ddf44.png)


```The Lib  is a web application to publish documentation or books written in Markdown. It was built with React/Material-UI/Next.js/Express/Mongoose/MongoDB and includes 3rd party APIs such as: Google, Github, AWS, Mailchimp and Stripe.```


_The Lib was developed in two weeks as part of my final project at Ironhack Miami._

## Live Demo

- Live app:  [thelib.tech](https://thelib.tech/)

Test the app by following the instructions below.

### Instructions
Follow this link [Demo](https://thelib.tech/books/mybook/introduction)

You will have access to the introduction and chapter 1 but
you will be asked for payment when you reach chapter 2.
Enter the following CC for test purposes.

```
Card number: 4242 4242 4242 4242
Exp: any future date, let's say 06/20
CVV: 4242
```

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
# MongoDB
MONGO_URL="xxxxxx"
MONGO_URL_TEST="xxxxxx"

# Google
Google_clientID="xxxxxx"
Google_clientSecret="xxxxxx"

# AWS
Amazon_accessKeyId="xxxxxx"
Amazon_secretAccessKey="xxxxxx"

# Support
EMAIL_SUPPORT_FROM_ADDRESS="xxxxxx"

# Github
Github_Test_ClientID="xxxxxx"
Github_Test_SecretKey="xxxxxx"
Github_Live_ClientID="xxxxxx"
Github_Live_SecretKey="xxxxxx"

# Stripe
Stripe_Test_SecretKey="xxxxxx"
Stripe_Live_SecretKey="xxxxxx"

# Mail Chimp
MAILCHIMP_API_KEY="xxxxxx"
MAILCHIMP_REGION="xxxxxx"
MAILCHIMP_SIGNUPS_LIST_ID="xxxxxx"
MAILCHIMP_PURCHASED_LIST_ID="xxxxxx"
MAILCHIMP_TUTORIALS_LIST_ID="xxxxxx"
```


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

#### Unit Test
- Jest

#### Upcoming Features

- Bookmarks
- Additional Integration (e.g. Pandoc)
- Dark theme toggle
- Smoother deployment with Docker


### Platform

- [ZEIT](https://zeit.co/now)

## License

#### All code in this repository is provided under the [MIT License](./LICENSE)