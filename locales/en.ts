// this is etalon locale type
const en = {
  menu: {
    about: {
      title: 'About',
    },
    contact: {
      title: 'Contact',
    },
    programs: {
      title: 'Programs',
    },
  },

  main: {
    tagline: 'Learn at the comfort from your home!',
    name: 'The core',
    description: 'Private english class',
    representation: 'with Desmond',
    action: 'Book',
  },

  lesson: {
    trial: {
      price: 'Just {amount} $ for trial lesson',
      description: 'Start with a 30 minute trial lesson',
    },
    normal: {
      // eslint-disable-next-line no-template-curly-in-string
      price: 'Only ${price} for a {minutes}-minutes lesson',
    },
  },

  user: {
    email: 'E-mail',
    name: 'Name',
  },

  advantage: {
    experience: '{amount} years of tutoring',
    students: 'For children and adults of all age group',
    approach: 'An individual approach to each one',
  },

  tutor: {
    nice: 'Nice to meet you!',
    hello: 'Hello everybody!',
    about: `Hello! I'm teacher Desmond from Cameroon and I am here to walk with you
    on your English mystery ride. Have you had difficulties speaking the
    English Language? Worry no more as with me as your ESL teacher, it'll be a ride
    through excellence unto perfection. I was born and live in Cameroon, having the
    English language as my local language and one of Cameroon's official languages.
    I have obtained a mastery of the English language from my years of experience
    communicating with it and I am also certified as having mastered the language to
    a highly considerable level. Are you ready to learn English? If yes, then choose
    me for your lessons and I will have you bragging about your mastery of the English
    language in no time.`,
    tagline: 'English classes for everyone',
    audience: 'for kids, beginners, intermediate and advanced students',
    email: 'Email',
    phone: 'Phone',
    question: {
      header: 'If you have some questions, please fill out the form below',
      email: '@:(user.email)',
      name: '@:(user.name)',
      message: 'Message',
    },
  },

  program: {
    kids: {
      title: 'Kids',
      description:
        'English for children from 4 years. The result is already in the first month',
    },
    beginners: {
      title: 'Beginners',
      description: 'Learning vocabulary for everyday topics and basic grammar.',
    },
    advanced: {
      title: 'Advanced',
      description:
        'We focus on your goals. Conversational English + Travel + Life abroad',
    },
    work: {
      title: 'For work',
      description:
        'You will master business vocabulary and easily communicate with English-speaking colleagues.',
    },
  },

  platform: {
    description:
      'Online classes using the Zoom platform, Google meet and Telegram',
  },

  action: {
    book: 'Book a lesson',
    signUp: 'Sing up',
    send: 'Send',
  },

  error: {
    lenMin: '{title} must be less than {len} characters',
    valid: '{title} must be valid',
    required: '{title} is required!',
  },
};

export default en;
