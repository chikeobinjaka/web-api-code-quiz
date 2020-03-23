/* The follwoing Web Technology - HTML questions come from
https://www.avatto.com/computer-science/test/mcqs/web-technology/html/162/1.html
*/

// /*
//  User Data
// */
// const USER_DATA_KEY = "code-quiz-user-data";
// const TEST_USER_DATA = {
//   johndoe: {
//     userName: "johndoe",
//     firstName: "John",
//     lastName: "Doe",
//     password: "!#password",
//     email: "johnDoe@gmail.com",
//     sessionCount: 0,
//     minScore: null,
//     maxScore: null,
//     lastScore: null,
//     sessionId: null,
//     sessionTime: null
//   },
//   marydoe: {
//     userName: "marydoe",
//     firstName: "Mary",
//     lastName: "Doe",
//     password: "*&password*(",
//     email: "marydoe@yahoo.com",
//     sessionCount: 0,
//     minScore: null,
//     maxScore: null,
//     lastScore: null,
//     sessionId: null,
//     sessionTime: null
//   }
// };

var userName = "";
var loginButton = document.getElementById("login-button");
var registerButton = document.getElementById("register-button");
var registerationForm = document.getElementById("registration-form");
var loginForm = document.getElementById("login-form");

// const QUESTION0 = "What does HTML stand for?";
// const CHOICES0 = {
//   "Hyper Text Markup Language": true,
//   "High Text Markup Language": false,
//   "Hyper Tabular Markup Language": false,
//   "None of the above": false
// };

// const QUESTION1 =
//   "Which of the following tag is used to mark a begining of paragraph";
// const CHOICES1 = {
//   "<td>": false,
//   "<br>": false,
//   "<p>": true,
//   "<tr>": false
// };

// const QUESTION2 = "From which tag descriptive list starts ?";
// const CHOICES2 = {
//   "<ll>": false,
//   "<dd>": false,
//   "<dl>": true,
//   "<ds>": false
// };

// const QUESTION3 = "Correct HTML tag for the largest heading is";
// const CHOICES3 = {
//   "<head>": false,
//   "<h6>": false,
//   "<heading>": false,
//   "<h1>": true
// };

// const QUESTION4 = "The attribute of <form> tag";
// const CHOICES4 = {
//   Method: false,
//   Action: false,
//   "Method & Action": true,
//   "None of the above": false
// };

// const QUESTION5 = "Markup tags tell the web browser";
// const CHOICES5 = {
//   "How to organise the page": false,
//   "How to display the page": true,
//   "How to display message box on page": false,
//   "None of the above": false
// };

// const QUESTION6 = "www is based on which model?";
// const CHOICES6 = {
//   "Local-server": false,
//   "Client-server": true,
//   "3-tier": false,
//   "None of the above": false
// };

// const QUESTION7 = "What are Empty elements and is it valid?";
// const CHOICES7 = {
//   "No, there is no such terms as Empty Element": false,
//   "Empty elements are element with no data": true,
//   "No, it is not valid to use Empty Element": false,
//   "None of the above": false
// };

// const QUESTION8 =
//   "Which of the following attributes of text box control allow to limit the maximum character?";
// const CHOICES8 = {
//   size: false,
//   len: false,
//   maxlength: true,
//   "all of the above": false
// };

// const QUESTION9 = "Web pages starts with which ofthe following tag?";
// const CHOICES9 = {
//   "<body>": false,
//   "<title>": false,
//   "<html>": false,
//   "<form>": false
// };

// const QUESTIONS = {
//   QUESTION0: CHOICES0,
//   QUESTION1: CHOICES1,
//   QUESTION2: CHOICES2,
//   QUESTION3: CHOICES3,
//   QUESTION4: CHOICES4,
//   QUESTION5: CHOICES5,
//   QUESTION6: CHOICES6,
//   QUESTION7: CHOICES7,
//   QUESTION8: CHOICES8,
//   QUESTION9: CHOICES9
// };

// const SESSION_ID_CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";
// const SESSION_ID_LENGTH = 24;
// /* Test function that saves the test userData into localStorage
//  */
// function initData() {
//   localStorage.setItem(USER_DATA_KEY, JSON.stringify(TEST_USER_DATA));
//   console.log(TEST_USER_DATA);
// }
// /* Function that reads the localStorage to locate the userData object. 
// This object contains an object that has all the user information. 
// The "key" for this object is USER_DATA_KEY
// */
// function loadAllUserData() {
//   var udata = localStorage.getItem(USER_DATA_KEY);
//   if (udata == null) {
//     initData();
//     udata = localStorage.getItem(USER_DATA_KEY);
//   }
//   if (udata != null) {
//     allUserData = JSON.parse(udata);
//     // now print it by getting the keys and iterating through them
//     var objectKeys = Object.keys(allUserData);
//     console.log(objectKeys);
//     console.log(objectKeys.length);
//     var len;
//     if (objectKeys != null && (len = objectKeys.length) != 0) {
//       console.log(len);
//       var outString = len + " User Data Entries found in database\n";
//       for (let index = 0; index < len; index++) {
//         var uname = objectKeys[index];
//         var ud = allUserData[uname];
//         outString += "\n\nUser Name     : " + uname;
//         outString += "\n\tFirst Name    : " + ud.firstName;
//         outString += "\n\tLast Name     : " + ud.lastName;
//         outString += "\n\tPassword      : " + ud.password;
//         outString += "\n\tEmail         : " + ud.email;
//         outString += "\n\tSession Count : " + ud.sessionCount;
//         outString += "\n\tMin Score     : " + ud.minScore;
//         outString += "\n\tMax Score     : " + ud.maxScore;
//         outString += "\n\tLast Score    : " + ud.lastScore;
//       }
//       console.log(outString);
//     }
//   }
// }

// // makes sure allUserData is loaded and then returns the userData corresponding
// // to the userId
// function getUserData(userId) {
//   var retval = null;
//   if (allUserData == null) {
//     loadAllUserData();
//   }
//   if (allUserData != null && userId != null) {
//     var objectKeys = Object.keys(allUserData);
//     for (let index = 0; index < objectKeys.length; index++) {
//       var val = objectKeys[index];
//       if (val.localeCompare(userId) === 0) {
//         retval = allUserData[val];
//         break;
//       }
//     }
//   }
//   return retval;
// }

/*
updates the database with session information for this user
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
// Event listeners are applied to the forms surrounding the buttons.
// that way when the button is clicked, the event is fired since the button
// type is "submit"
registerationForm.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Register button clicked");
  // check inputs
  var svalue;
  var fnameEl = document.getElementById("firstname");
  var lnameEl = document.getElementById("lastName");
  var unameEl = document.getElementById("registration-userName");
  var pwdEl = document.getElementById("registration-password");
  var pwdEl2 = document.getElementById("registration-confirm-password");
  var emailEl = document.getElementById("email-input");
  var errorEl = document.getElementById("registration-error-message");

  var fname, lname, uname, pwd, pwd2, emailString;

  errorEl.innerHTML = "";

  // First Name
  if (
    (svalue = fnameEl.value) === null ||
    (fname = svalue.trim()).length === 0
  ) {
    errorEl.innerHTML = "Invalid First Name";
    fnameEl.focus();
    fnameEl.value = "";
    return;
  }
  // Last Name
  if (
    (svalue = lnameEl.value) === null ||
    (lname = svalue.trim()).length === 0
  ) {
    errorEl.innerHTML = "Invalid Last Name";
    lnameEl.focus();
    lnameEl.value = "";
    return;
  }
  // User Name
  if (
    (svalue = unameEl.value) === null ||
    (uname = svalue.trim()).length === 0
  ) {
    errorEl.innerHTML = "Invalid User Name";
    unameEl.focus();
    unameEl.value = "";
    return;
  }
  // Password
  if ((svalue = pwdEl.value) === null || (pwd = svalue.trim()).length === 0) {
    errorEl.innerHTML = "Invalid Password";
    pwdEl.focus();
    pwdEl.value = "";
    return;
  }
  // Confirm Password
  if ((svalue = pwdEl2.value) === null || (pwd2 = svalue.trim()).length === 0) {
    errorEl.innerHTML = "Invalid Confirm Password";
    pwdEl2.focus();
    pwdEl2.value = "";
    return;
  }
  // check if password and confirm password are the same. If not, delete
  // both and set focus back to pwd
  if (pwd.localeCompare(pwd2) != 0) {
    errorEl.innerHTML = "Mismatched Password/Confirm Password";
    pwdEl.value = "";
    pwdEl2.value = "";
    pwdEl.focus();
  }
  // Email
  if (
    (svalue = emailEl.value) === null ||
    (emailString = svalue.trim()).length === 0
  ) {
    errorEl.innerHTML = "Invalid Email";
    emailEl.focus();
    emailEl.value = "";
    return;
  }

  // log it
  // svalue = "*** Registration info ***\n";
  // svalue += "\n\tFirst Name:       " + fname;
  // svalue += "\n\tLast Name:        " + lname;
  // svalue += "\n\tUser Name:        " + uname;
  // svalue += "\n\tPassword:         " + pwd;
  // svalue += "\n\tConfirm Password: " + pwd2;
  // svalue += "\n\tEmail:            " + emailString;
  // svalue += "\n";
  // console.log(svalue);
  //
  // check if user exists in the database by userName
  var userData = getUserData(uname);
  if (userData != null) {
    errorEl.innerHTML =
      "Username <strong>" + uname + "</strong> already in use";
    unameEl.value = "";
    unameEl.focus();
  }
});

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  // check the inputs to make sure the entry is valid
  var unameElement = document.getElementById("login-userName");
  var pwdElement = document.getElementById("login-password");
  var errorEl = document.getElementById("login-error-message");

  if (unameElement === null || pwdElement == null) return;
  var inputString;
  var userNameString, passwordString;
  // check userName validity
  if (
    (inputString = unameElement.value) == null ||
    (userNameString = inputString.trim().toLowerCase()).length == 0
  ) {
    console.log("UserNameString = " + userNameString);
    unameElement.value = "";
    unameElement.focus();
    errorEl.innerHTML = "Invalid Username entry";
    return;
  }
  // check password validity
  if (
    (inputString = pwdElement.value) == null ||
    (passwordString = inputString.trim().toLowerCase()).length == 0
  ) {
    pwdElement.value = "";
    pwdElement.focus();
    errorEl.innerHTML = "Invalid Password entry";
    return;
  }
  console.log("UserName: " + userNameString + "\nPassword: " + passwordString);
  var userData = getUserData(userNameString);
  if (userData == null) {
    errorEl.innerHTML = "<strong>" + userNameString + "</strong> not found";
    unameElement.focus();
    return;
  }
  // check if password matches with database password
  if (passwordString.localeCompare(userData.password) != 0) {
    var errStr = "Password mismatch for Username <strong>";
    errStr += userNameString + "</strong>";
    errorEl.innerHTML = errStr;
    pwdElement.value = "";
    pwdElement.focus();
    return;
  }
  // at this point, user login is validated. Clear page and go to game page
  console.log("UserID " + userNameString + " successfully logged in!!");
  setSessionData(userData);
  var targetUrl = "./page2.html?";
  targetUrl += "userId="+userData.userName;
  targetUrl += "&sessionId=" + userData.sessionId;
  targetUrl += "&sessionTime=" + userData.sessionTime;
  window.location.replace(targetUrl);
});

function registerUser(id, fname, lname, pwd, email) {}
initData();
loadAllUserData();
