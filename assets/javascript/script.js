/* The follwoing Web Technology - HTML questions come from
https://www.avatto.com/computer-science/test/mcqs/web-technology/html/162/1.html
*/

/*
 User Data
*/
const USER_DATA_KEY = "code-quiz-user-data";
var userName = "";
const TEST_USER_DATA = {
  johnDoe: {
    firstName: "John",
    lastName: "Doe",
    password: "!#password",
    email: "johnDoe@gmail.com"
  },
  marydoe: {
    firstName: "Mary",
    lastName: "Doe",
    password: "*&password*(",
    email: "marydoe@yahoo.com"
  }
};

var userData;

var loginButton = document.getElementById("login-button");
var registerButton = document.getElementById("register-button");
const QUESTION0 = "What does HTML stand for?";
const CHOICES0 = {
  "Hyper Text Markup Language": true,
  "High Text Markup Language": false,
  "Hyper Tabular Markup Language": false,
  "None of the above": false
};

const QUESTION1 =
  "Which of the following tag is used to mark a begining of paragraph";
const CHOICES1 = {
  "<td>": false,
  "<br>": false,
  "<p>": true,
  "<tr>": false
};

const QUESTION2 = "From which tag descriptive list starts ?";
const CHOICES2 = {
  "<ll>": false,
  "<dd>": false,
  "<dl>": true,
  "<ds>": false
};

const QUESTION3 = "Correct HTML tag for the largest heading is";
const CHOICES3 = {
  "<head>": false,
  "<h6>": false,
  "<heading>": false,
  "<h1>": true
};

const QUESTION4 = "The attribute of <form> tag";
const CHOICES4 = {
  Method: false,
  Action: false,
  "Method & Action": true,
  "None of the above": false
};

const QUESTION5 = "Markup tags tell the web browser";
const CHOICES5 = {
  "How to organise the page": false,
  "How to display the page": true,
  "How to display message box on page": false,
  "None of the above": false
};

const QUESTION6 = "www is based on which model?";
const CHOICES6 = {
  "Local-server": false,
  "Client-server": true,
  "3-tier": false,
  "None of the above": false
};

const QUESTION7 = "What are Empty elements and is it valid?";
const CHOICES7 = {
  "No, there is no such terms as Empty Element": false,
  "Empty elements are element with no data": true,
  "No, it is not valid to use Empty Element": false,
  "None of the above": false
};

const QUESTION8 =
  "Which of the following attributes of text box control allow to limit the maximum character?";
const CHOICES8 = {
  size: false,
  len: false,
  maxlength: true,
  "all of the above": false
};

const QUESTION9 = "Web pages starts with which ofthe following tag?";
const CHOICES9 = {
  "<body>": false,
  "<title>": false,
  "<html>": false,
  "<form>": false
};

const QUESTIONS = {
  QUESTION0: CHOICES0,
  QUESTION1: CHOICES1,
  QUESTION2: CHOICES2,
  QUESTION3: CHOICES3,
  QUESTION4: CHOICES4,
  QUESTION5: CHOICES5,
  QUESTION6: CHOICES6,
  QUESTION7: CHOICES7,
  QUESTION8: CHOICES8,
  QUESTION9: CHOICES9
};

/* Test function that saves the test userData into localStorage
 */
function initData() {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(TEST_USER_DATA));
  console.log(TEST_USER_DATA);
}

/* Function that reads the localStorage to locate the userData object. 
This object contains an object that has all the user information. 
The "key" for this object is USER_DATA_KEY
*/
function loadUserData() {
  var udata = localStorage.getItem(USER_DATA_KEY);
  if (udata == null) {
    initData();
    udata = localStorage.getItem(USER_DATA_KEY);
  }
  if (udata != null) {
    userData = JSON.parse(udata);
    // now print it by getting the keys and iterating through them
    var objectKeys = Object.keys(userData);
    console.log(objectKeys);
    console.log(objectKeys.length);
    var len;
    if (objectKeys != null && (len = objectKeys.length) != 0) {
      console.log(len);
      var outString = len + " User Data Entries found in database\n";
      for (let index = 0; index < len; index++) {
        var uname = objectKeys[index];
        var ud = userData[uname];
        outString += "\n\nUser Name:" + uname;
        outString += "\n\tFirst Name: " + ud.firstName;
        outString += "\n\tLast Name : " + ud.lastName;
        outString += "\n\tPassword  : " + ud.password;
        outString += "\n\tEmail     : " + ud.email;
      }
      console.log(outString);
    }
  }
}

function registerUser(id,fname,lname,pwd,email){

}
loadUserData();
