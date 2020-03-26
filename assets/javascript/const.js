/*
 User Data
*/
const SESSION_TIMEOUT_DELAY = 5 * 1000; // five (5) seconds
const USER_DATA_KEY = "code-quiz-user-data";
const TEST_USER_DATA = {
  johndoe: {
    userName: "johndoe",
    firstName: "John",
    lastName: "Doe",
    password: "!#password",
    email: "johnDoe@gmail.com",
    sessionCount: 0,
    minScore: null,
    maxScore: null,
    lastScore: null,
    sessionId: null,
    sessionTime: null
  },
  marydoe: {
    userName: "marydoe",
    firstName: "Mary",
    lastName: "Doe",
    password: "*&password*(",
    email: "marydoe@yahoo.com",
    sessionCount: 0,
    minScore: null,
    maxScore: null,
    lastScore: null,
    sessionId: null,
    sessionTime: null
  }
};

const SESSION_ID_CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";
const SESSION_ID_LENGTH = 24;
const QUIZ_TIME_SECONDS = 60;
const QUIZ_TIME_MILLI = QUIZ_TIME_SECONDS * 1000;
// Interval period for the quiz time. The timer display will be
// updated within this value in milliseconds
const QUIZ_TIME_INTERVAL_MILLI = 100;
// number of questions for each quiz session
const QUESTIONS_PER_QUIZ = 10;
// time interval (in milliseconds) per question
const QUESTION_TIME_MILLI = QUIZ_TIME_MILLI / QUESTIONS_PER_QUIZ;
var allUserData;
// counts the number of questions asked
var questionCounter = 0;

/*
 * updates the database with session information for this user
 */
function setSessionData(userData) {
  if (userData != null) {
    var userId = userData.userName;
    userData.sessionId = randomString(SESSION_ID_LENGTH, SESSION_ID_CHARACTERS);
    userData.sessionTime = new Date().getTime();
    allUserData[userId] = userData;
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(allUserData));
  }
}

/*
 * Generates a random string of length len from characters in inputString
 */
function randomString(len, inputString) {
  var ans = "";
  for (var i = len; i > 0; i--) {
    ans += inputString[Math.floor(Math.random() * inputString.length)];
  }
  return ans;
}
/*
 * Test function that saves the test userData into localStorage
 */
function initData() {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(TEST_USER_DATA));
  console.log(TEST_USER_DATA);
}

/*
 *
 */
function getUserDataLogText(ud) {
  var retval = "\n";
  retval += "\n\tUser Id       : " + ud.userName;
  retval += "\n\tFirst Name    : " + ud.firstName;
  retval += "\n\tLast Name     : " + ud.lastName;
  retval += "\n\tPassword      : " + ud.password;
  retval += "\n\tEmail         : " + ud.email;
  retval += "\n\tSession Count : " + ud.sessionCount;
  retval += "\n\tMin Score     : " + ud.minScore;
  retval += "\n\tMax Score     : " + ud.maxScore;
  retval += "\n\tLast Score    : " + ud.lastScore;
  retval += "\n\tSession ID    : " + ud.sessionId;
  retval += "\n\tSession Time  : " + ud.sessionTime;
  return retval;
}

/*
 * Function that reads the localStorage to locate the userData object.
 * This object contains an object that has all the user information.
 * The "key" for this object is USER_DATA_KEY
 */
function loadAllUserData() {
  var udata = localStorage.getItem(USER_DATA_KEY);
  if (udata == null) {
    initData();
    udata = localStorage.getItem(USER_DATA_KEY);
  }
  if (udata != null) {
    allUserData = JSON.parse(udata);
    logAllUserData(allUserData);
  }
}

/*
 * Console logs all user data information from localStorage
 */
function logAllUserData(allUserData) {
  //now print it by getting the keys and iterating through them
  var objectKeys = Object.keys(allUserData);
  console.log(objectKeys);
  console.log(objectKeys.length);
  var len;
  if (objectKeys != null && (len = objectKeys.length) != 0) {
    console.log(len);
    var outString = len + " User Data Entries found in database\n";
    for (let index = 0; index < len; index++) {
      var uname = objectKeys[index];
      var ud = allUserData[uname];
      outString += getUserDataLogText(ud);
    }
    console.log(outString);
  }
}
/*
 * Makes sure allUserData is loaded and then returns the userData
 * corresponding to the userId
 */
function getUserData(userId) {
  var retval = null;
  if (allUserData == null) {
    loadAllUserData();
  }
  if (allUserData != null && userId != null) {
    var objectKeys = Object.keys(allUserData);
    for (let index = 0; index < objectKeys.length; index++) {
      var val = objectKeys[index];
      if (val.localeCompare(userId) === 0) {
        retval = allUserData[val];
        break;
      }
    }
  }
  return retval;
}
