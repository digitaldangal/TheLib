import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import logger from '../logs';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

// Inserts an email template to the DB
function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome to TheLib.org',
      message: `{{userName}},
        <p>
          Thanks for signing up for The Lib!
        </p>
        <p>
          In our books, we help you publish or sell PDF books, hassle-free.
        </p>

        Ruben Vargas, The Lib
      `,
    },
  ];
  // For each template that's inserted, search the DB for templates w/ the same name.
  // Pause(await) until the count comes back. If the method finds a template w/ the same name,
  //  then the count is 1 or more and it returns undefined but
  templates.forEach(async (template) => {
    if ((await EmailTemplate.find({ name: template.name }).count()) > 0) {
      return;
    }
    // if we can't find a template w/ the same name(count = 0),
    // create a document `EmailTemplate.create()` w/ data inside `const templates = []`
    // It will copy the name,subject and message to a brand new doc in the DB.
    EmailTemplate.create(template).catch((error) => {
      logger.error('EmailTemplate insertion error:', error);
    });
  });
}

insertTemplates();
// getEmailTemplate() will retrieve the EmailTemplate doc from the DB and replace variables like
// username to docs values.
// getEmailTemplate() is the only function being exported from this file because
// it's going to be used in the User model(welcome emails) and Book Model(purchase emails)
export default async function getEmailTemplate(name, params) {
  // wait till method finds template by name
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    // if method find no name, return an error
    throw new Error('not found');
  }

  return {
    // else, apply `Handlebars.compile()` to subject and message params of a template
    // Handlebars.compile(template, params) replaces any hbs variable w/ actual variables
    //  http://handlebarsjs.com/reference.html
    message: Handlebars.compile(source.message)(params),
    subject: Handlebars.compile(source.subject)(params),
  };
}

// throw behavior => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
