console.log("Value of USER_DATA_KEY is " + USER_DATA_KEY);

var containerDivEl = document.getElementById("container-div");
// section that will contain the dynamic part of the page. Will
// be child of containerDivEl
var dynamicSection;
const DYNAMIC_SECTION_ID = "dynamic-section";
const OPTIONS_BUTTON_CLASS_ARRAY = [
  "btn",
  "btn-primary",
  "btn-lg",
  "btn-block"
];
/*
Reads the session data from the URL and checks against the information in the
 database as well as compare the time to the current time. If more than 
 SESSION_DELAY_TIMEOUT milliseconds has passed, the session will have timed out
  and the start quiz button will be disabled
*/
function checkSessionData() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var userId, sessionId, sessionTime, urlSessionMilli, sessionMilli;
  var userData, currentTimeMilli;
  var startQuizBtn = document.getElementById("start-quiz-btn");
  var errEl = document.getElementById("start-quiz-error");
  var errText;

  currentTimeMilli = new Date().getTime();

  console.log("Current time in milli: " + currentTimeMilli);
  console.log("Query String: " + queryString);

  // check for userId in URL parameters
  if ((userId = urlParams.get("userId")) == null) {
    disableAndFadeButton(startQuizBtn);
    errText = "Error in page URL: missing <strong>";
    errText += "userId</strong> parameter";
    errEl.innerHTML = errText;
    return false;
  }
  console.log("URL userID = " + userId);

  // check for sessionId in URL parameters
  if ((sessionId = urlParams.get("sessionId")) == null) {
    disableAndFadeButton(startQuizBtn);
    errText = "Error in page URL: missing <strong>";
    errText += "sessionId</strong> parameter";
    errEl.innerHTML = errText;
    return false;
  }
  console.log("URL sessionId = " + sessionId);

  // check for sessionTime in URL parameters
  if ((sessionTime = urlParams.get("sessionTime")) == null) {
    disableAndFadeButton(startQuizBtn);
    errText = "Error in page URL: missing <strong>";
    errText += "sessionTime</strong> parameter";
    errEl.innerHTML = errText;
    return false;
  }
  console.log("URL SessionTime = " + sessionTime);

  // check for userData in localStorage data
  if ((userData = getUserData(userId)) === null) {
    disableAndFadeButton(startQuizBtn);
    errText = "Unable to initialize userID <strong>";
    errText += userId + "</strong>";
    errEl.innerHTML = errText;
    return false;
  }

  // make sure URL sessionId is the same as userData sessionId
  if (sessionId.localeCompare(userData.sessionId) != 0) {
    disableAndFadeButton(startQuizBtn);
    errText = "URL sessionId (" + sessionId;
    errText += ") does not match User Data sessionId (";
    errText += userData.sessionId + ")";
    errEl.innerHTML = errText;
    console.log(errText);
    return false;
  }
  // check if the session IDs can be converted to numbers
  if (
    (urlSessionMilli = Number.parseInt(sessionTime)) === NaN ||
    (sessionMilli = Number.parseInt(userData.sessionTime)) === NaN
  ) {
    disableAndFadeButton(startQuizBtn);
    // startQuizBtn.disabled = true;
    // startQuizBtn.style.opacity = 0.6;
    errText = "Error with sessionTime URL parameter";
    errText += " or stored session time";
    errEl.innerHTML = errText;

    return false;
  }
  // check if current session time is with the delay
  if (currentTimeMilli - urlSessionMilli > SESSION_TIMEOUT_DELAY) {
    disableAndFadeButton(startQuizBtn);
    errEl.innerHTML = "Session Timeout Error";

    errText = "\nURL Session Time: " + sessionTime;
    errText += "\nInteger URL Session Time: " + urlSessionMilli;
    errText += "\nUser Data Session Time: " + userData.sessionTime;
    errText += "\nInteger User Data Session Time: " + sessionMilli;
    console.log(errText);
    return false;
  }
  console.log(getUserDataLogText(userData));
  // WELCOME!!
  var welcomeText = "Welcome <strong>" + userData.firstName + " ";
  welcomeText += userData.lastName + "</strong> (" + userData.userName + ")";
  document.getElementById("welcome-message").innerHTML = welcomeText;
  return true;
}

function disableAndFadeButton(btn) {
  btn.disabled = true;
  btn.style.opacity = 0.6;
}

checkSessionData();

var startQuizButtonEl = document.getElementById("start-quiz-btn");

startQuizButtonEl.addEventListener("click", function(event) {
  console.log("Start Quiz Button clicked");
  var sectionEl = document.getElementById("remove-section");
  containerDivEl.removeChild(sectionEl);

  // create DIV element with class of "row justify-content-center"
  // and append to container
  var div1 = document.createElement("div");
  div1.classList.add("row");
  div1.classList.add("justify-content-center");
  containerDivEl.appendChild(div1);

  var removeSectionParent = document.createElement("div");
  removeSectionParent.classList.add("col-sm-6");
  div1.appendChild(removeSectionParent);

  var removeSection = document.createElement("section");
  removeSection.id = "remove-section";
  removeSectionParent.appendChild(removeSection);

  var questionsKeys = Object.keys(QUESTIONS);
  console.log("QUESTIONS Keys: " + questionsKeys);
  // get the first question
  var question = questionsKeys[0];
  var options = QUESTIONS[question];

  renderQuestion(question, options, removeSection);

});

function renderQuestion(question, options, removeSection) {
  // create h3 tag and append to remove-section
  var h3tag = document.createElement("h3");
  h3tag.innerText = question;
  removeSection.appendChild(h3tag);

  // create "<div class="list-group">" and append to remove-section
  var listGroupDiv = document.createElement("div");
  listGroupDiv.classList.add("list-group");
  removeSection.appendChild(listGroupDiv);
  var buttonList = getListGroupButtons(options, OPTIONS_BUTTON_CLASS_ARRAY);
  for (let index = 0; index < buttonList.length; index++) {
    listGroupDiv.appendChild(buttonList[index]);
  }
}
/*
 * Returns a list of buttons from the options. Options contain possible answers as keys
 * and true/false as values
 */
function getListGroupButtons(options, classArray) {
  var retval = [];
  var optionsKeys = Object.keys(options);

  for (let index = 0; index < optionsKeys.length; index++) {
    var optionKey = optionsKeys[index];
    var optionValue = options[optionKey];
    var optionButton = document.createElement("button");
    optionButton.setAttribute("type", "button");
    optionButton.setAttribute("data-correct", optionValue);
    // add the class list
    optionButton.classList.add(...classArray);
    // set the button text
    optionButton.innerHTML = optionKey;
    retval.push(optionButton);
  }
  return retval;
}
