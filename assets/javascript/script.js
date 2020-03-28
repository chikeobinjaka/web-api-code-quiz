/* The follwoing Web Technology - HTML questions come from
https://www.avatto.com/computer-science/test/mcqs/web-technology/html/162/1.html
*/

var userName = "";
var loginButton = document.getElementById("login-button");
var registerButton = document.getElementById("register-button");
var registerationForm = document.getElementById("registration-form");
var loginForm = document.getElementById("login-form");

function clearRegistrationForm() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("registration-userName").value = "";
  document.getElementById("registration-password").value = "";
  document.getElementById("registration-confirm-password").value = "";
  document.getElementById("email-input").value = "";

  document.getElementById("registration-error-message").innerHTML = "";
  document.getElementById("firstname").focus();
}
/*
 * Event listeners are applied to the forms surrounding the buttons.
 * that way when the button is clicked, the event is fired since the button
 * type is "submit"
 */
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

  var fname, lname, uname, pwd, pwd2, emailString, errText;

  errorEl.innerHTML = "";

  var udata = {};
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
  udata.firstName = fname;

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
  udata.lastName = lname;

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
  udata.userName = uname;

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
  udata.password = pwd;

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
  udata.email = emailString;
  //
  // check if user exists in the database by userName
  var userData = getUserData(uname);
  if (userData != null) {
    errText = "Username <strong>" + uname;
    errText += "</strong> already in use";
    errorEl.innerHTML = errText;
    unameEl.value = "";
    unameEl.focus();
    return;
  }
  udata.sessionCount = 0;
  // now save data into localStorage
  var logString = "Successfully registered user:\n";
  logString += getUserDataLogText(udata);
  console.log(logString);
  // save registrant into localStorage
  setSessionData(udata);

  // clear the register form
  clearRegistrationForm();
});

/*
 *
 */
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

  navigateToStartOfQuiz(userData);
  // setSessionData(userData);
  // var targetUrl = "./page2.html?";
  // targetUrl += "userId=" + userData.userName;
  // targetUrl += "&sessionId=" + userData.sessionId;
  // targetUrl += "&sessionTime=" + userData.sessionTime;
  // window.location.replace(targetUrl);
});
console.log(shuffleArray(Object.keys(HTML_QUESTIONS), 10));

loadAllUserData();
