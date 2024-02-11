const mongoose = require('mongoose');
const validator = require('validator'); // To use for email and URL validation

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [4, 'Username must be at least 4 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]*$/.test(v); // Allows only alphabets and spaces
      },
      message: props => `${props.value} is not a valid city name!`
    }
  },
  website: {
    type: String,
    required: [true, 'Website URL is required'],
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  zipCode: {
    type: String,
    required: [true, 'Zip code is required'],
    validate: {
      validator: function(v) {
        return /^\d{5}-\d{4}$/.test(v); // Matches the pattern DDDDD-DDDD
      },
      message: props => `${props.value} is not a valid zip code format!`
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^1-\d{3}-\d{3}-\d{4}$/.test(v); // Matches the pattern 1-DDD-DDD-DDDD
      },
      message: props => `${props.value} is not a valid phone format!`
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
