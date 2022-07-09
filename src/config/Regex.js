
const Regex = {
    MOBILE_REGEX    :   /^([+]\d{2})?\d{10}$/,
    EMAIL_REGEXP    :   /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$/,
    USERNAME_REGEX  :   /^[0-9a-zA-Z]+$/,
    FULL_NAME_REGEX :   /^[a-zA-Z ]+$/,
    NAME_REGEX      :   /^[a-zA-Z]+$/,
    PASSWORD_REGEX  :   /^[a-zA-Z0-9]{3,30}$/,
    NUMERIC_REGEX   :   /[^0-9]/g,
  }
  
  module.exports= Regex;