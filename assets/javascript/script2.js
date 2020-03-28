var containerDivEl = document.getElementById("container-div");
// section that will contain the dynamic part of the page. Will
// be child of containerDivEl
var dynamicSection;
// main quiz time remaining value
var quizTimeRamainingMilli = QUIZ_TIME_MILLI;
// SPAN element that displays the quiz remaining time
var quizTimeRamainingEl = document.getElementById("quiz-remaining-time");
var quizTimeIntervalTimer;
var questionIntervalTimer;
var removeSection;
var removeSectionParent;
var correctAnswerCount = 0;
var userData;
var perCentVal;
const DYNAMIC_SECTION_ID = "dynamic-section";
const LIST_GROUP_DIV_ID = "list-group-div";
const OPTIONS_BUTTON_CLASS_ARRAY = [
  "btn",
  "btn-primary",
  "btn-lg",
  "btn-block"
];

/*
 * Updates the Quiz remaining time element from remaining time
 * global variable
 */
function updateQuizRemainingTime() {
  // remaining time is in milliseconds. Divide by 1000 to get seconds
  var formattedTime = "00.00";
  if (quizTimeRamainingMilli > 0) {
    var secondInt = Number.parseInt(quizTimeRamainingMilli / 1000);
    var subSecondInt = Math.round((quizTimeRamainingMilli % 1000) / 10);
    if (secondInt < 10) {
      formattedTime = "0" + secondInt + ".";
    } else {
      formattedTime = secondInt + ".";
    }
    if (subSecondInt < 10) {
      formattedTime += "0";
    }
    formattedTime += subSecondInt;
  }
  quizTimeRamainingEl.textContent = formattedTime;
}
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
  var currentTimeMilli;
  var startQuizBtn = document.getElementById("start-quiz-btn");
  var errEl = document.getElementById("start-quiz-error");
  var errText;

  currentTimeMilli = new Date().getTime();

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
    return false;
  }
  // check if the session IDs can be converted to numbers
  if (
    (urlSessionMilli = Number.parseInt(sessionTime)) === NaN ||
    (sessionMilli = Number.parseInt(userData.sessionTime)) === NaN
  ) {
    disableAndFadeButton(startQuizBtn);
    errText = "Error with sessionTime URL parameter";
    errText += " or stored session time";
    errEl.innerHTML = errText;
    return false;
  }
  // check if current session time is with the delay
  if (currentTimeMilli - urlSessionMilli > SESSION_TIMEOUT_DELAY) {
    disableAndFadeButton(startQuizBtn);
    errEl.innerHTML = "Session Timeout Error";
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

function quizTimerCallback() {
  quizTimeRamainingMilli -= QUIZ_TIME_INTERVAL_MILLI;
  updateQuizRemainingTime();

  if (quizTimeRamainingMilli <= 0) {
    clearInterval(quizTimeIntervalTimer);
    showQuizResult();
  }
}

/*
 * Called when the start quiz button is clicked. This function
 * will start the overall timer. Also will hide the View Scores
 * Anchor
 *
 */
function startQuizEventListenerCallback(event) {
  var sectionEl = document.getElementById("remove-section");
  containerDivEl.removeChild(sectionEl);
  // create DIV element with class of "row justify-content-center"
  // and append to container
  var div1 = document.createElement("div");
  div1.classList.add("row");
  div1.classList.add("justify-content-center");
  containerDivEl.appendChild(div1);

  removeSectionParent = document.createElement("div");
  removeSectionParent.classList.add("col-sm-6");
  div1.appendChild(removeSectionParent);

  removeSection = document.createElement("section");
  removeSection.id = "remove-section";
  removeSectionParent.appendChild(removeSection);

  quizTimeIntervalTimer = setInterval(
    quizTimerCallback,
    QUIZ_TIME_INTERVAL_MILLI
  );
  renderQuestion(removeSection);
}

/*
 * Grabs a random question from the list and renders it for the user to answer
 */
function renderQuestion(removeSection) {
  // var questionsObject = US_CIVICS_QUESTIONS;
  // var questionsObject = HTML_QUESTIONS;
  var questionsObject = CSS_HTML_QUESTIONS;

  var questionsKeys = Object.keys(questionsObject);
  // get a random question
  var qlen = questionsKeys.length;
  var pointer = Math.floor(Math.random() * qlen);
  // get the question
  var question = questionsKeys[pointer];
  var options = questionsObject[question];

  // create h3 tag and append to remove-section
  var h3tag = document.createElement("h3");
  h3tag.innerText = question;
  removeSection.appendChild(h3tag);

  // create "<div class="list-group">" and append to remove-section
  var listGroupDiv = document.createElement("div");
  listGroupDiv.classList.add("list-group");
  listGroupDiv.id = LIST_GROUP_DIV_ID;
  removeSection.appendChild(listGroupDiv);
  var buttonList = getListGroupButtons(options, OPTIONS_BUTTON_CLASS_ARRAY);
  for (let index = 0; index < buttonList.length; index++) {
    listGroupDiv.appendChild(buttonList[index]);
  }

  // attach a listener to the listGroupDiv that will fire when the buttons are clicked
  listGroupDiv.addEventListener("click", listGroupDivEventListenerCallback);
  questionCounter++;
}

/*
 * Called when any one of the quiz question options is clicked
 */
function listGroupDivEventListenerCallback(event) {
  event.preventDefault();
  var targetButton = event.target;
  // check to make sure the target is a button
  if (targetButton.matches("button")) {
    // get the value of the "data-correct" attribute
    let dataCorrect = targetButton.dataset.correct;
    // check answer
    if (dataCorrect.localeCompare("true") === 0) {
      correctAnswerCount++;
    } else {
      // subtract 6 seconds from the quiz time
      quizTimeRamainingMilli -= QUESTION_TIME_MILLI;
      var errText = "Deducted " + QUESTION_TIME_MILLI;
      errText += "from quiz time due to incorrect answer";
      console.log(errText);
    }
    // if QUESTIONS_PER_QUIZ have not been asked, render remove
    // the "removeSection" from its parent and render question again
    if (questionCounter < QUESTIONS_PER_QUIZ) {
      removeSectionParent.removeChild(removeSection);
      removeSection = document.createElement("section");
      removeSection.id = "remove-section";
      removeSectionParent.appendChild(removeSection);
      renderQuestion(removeSection);
    } else {
      // kill the interval timer
      clearInterval(quizTimeIntervalTimer);
      showQuizResult();
    }
  }
}

/*
 * Removes the removeSection and renders the quiz result
 */
function showQuizResult() {
  removeSectionParent.removeChild(removeSection);
  removeSection = document.createElement("section");
  removeSection.id = "remove-section";
  removeSectionParent.appendChild(removeSection);
  console.log("Show quiz result");
  // <div class="row justify-content-center">
  //   <h2>
  //     Score for
  //     <span style="color: gold;font-family: 'Courgette', cursive;"
  //       >Chikeobi Njaka</span
  //     >
  //   </h2>
  // </div>
  var divEl = document.createElement("div");
  divEl.classList.add("row");
  divEl.classList.add("justify-content-center");
  removeSection.appendChild(divEl);
  var h2El = document.createElement("h2");
  var htmlText = 'Score for <span style="';
  htmlText += "color: gold;font-family: 'Courgette', cursive;\">";
  htmlText += userData.firstName + " " + userData.lastName;
  htmlText += "</span></h2></div>";
  h2El.innerHTML = htmlText;
  divEl.appendChild(h2El);

  var rowDiv = getScoreRow("Correct:", correctAnswerCount);
  console.log("Row DIV outerHTML:\n" + rowDiv.outerHTML);

  removeSection.appendChild(getScoreRow("Correct:", correctAnswerCount));
  var incorrectCount = QUESTIONS_PER_QUIZ - correctAnswerCount;
  removeSection.appendChild(getScoreRow("Incorrect", incorrectCount));
  perCentVal = Math.round((correctAnswerCount / QUESTIONS_PER_QUIZ) * 100);
  removeSection.appendChild(getScoreRow("Score:", perCentVal + "%"));
  var letterGrade = getLetterGrade(correctAnswerCount, QUESTIONS_PER_QUIZ);
  removeSection.appendChild(getScoreRow("Grade:", letterGrade));

  //  *  <div class="row justify-content-left" id="save-score-div">
  //  *    <div class="col-md-auto">
  //  *      <h3>Save Score?</h3>
  //  *    </div>
  //  *    <div class="col-md-auto">
  //  *      <button class="btn btn-primary" type="button" value="yes">Yes</button>
  //  *    </div>
  //  *    <div class="col-md-auto">
  //  *      <button class="btn btn-primary" type="button" value="no">No</button>
  //  *    </div>
  //  *  </div>
  //  *
  var btnCls = ["btn", "btn-primary"];

  var lastDivEl = document.createElement("div");
  lastDivEl.classList.add("row");
  lastDivEl.classList.add("justify-content-left");
  lastDivEl.id = "save-score-div";
  removeSection.appendChild(lastDivEl);

  var divRow1 = document.createElement("div");
  divRow1.classList.add("col-md-auto");
  lastDivEl.appendChild(divRow1);
  var h3_1 = document.createElement("h3");
  h3_1.innerHTML = "Save Score?";
  divRow1.appendChild(h3_1);

  var divRow2 = document.createElement("div");
  divRow2.classList.add("col-md-auto");
  lastDivEl.appendChild(divRow2);
  var btnEl1 = document.createElement("button");
  btnEl1.classList.add(...btnCls);
  btnEl1.value = "yes";
  btnEl1.innerHTML = "Yes";
  btnEl1.type = "button";
  divRow2.appendChild(btnEl1);

  var divRow3 = document.createElement("div");
  divRow3.classList.add("col-md-auto");
  lastDivEl.appendChild(divRow3);
  var btnEl2 = document.createElement("button");
  btnEl2.classList.add(...btnCls);
  btnEl2.value = "no";
  btnEl2.innerHTML = "No";
  btnEl2.type = "button";
  divRow3.appendChild(btnEl2);

  lastDivEl.addEventListener("click", quizResultEventListenerCallback);
}

/*
 * Called as a result of asking the user if they want to save the quiz result
 */
function quizResultEventListenerCallback(event) {
  var targetEl = event.target;
  var logText = "A yes/no button was clicked. The clicked\n";
  logText += "item is a " + targetEl.tagName;
  if (targetEl.tagName.toLowerCase().localeCompare("button") != 0) {
    return;
  }
  if (targetEl.value.toLowerCase().localeCompare("yes") == 0) {
    saveScore(perCentVal);
    doYouWantAnotherGoAtTheQuiz();
  } else {
    doYouWantAnotherGoAtTheQuiz();
  }
  logText += "\n " + targetEl.value + " Button Clicked";
  console.log(logText);
}

/*
 * Updates UserData and saves the user quiz score to localStorage.
 */
function saveScore(perCentVal) {
  // update UserData object
  userData.sessionCount = userData.sessionCount + 1;
  userData.lastScore = perCentVal;
  if (userData.maxScore == null) {
    userData.maxScore = perCentVal;
  }
  if (userData.minScore == null) {
    userData.minScore = perCentVal;
  }
  if (perCentVal > userData.maxScore) {
    userData.maxScore = perCentVal;
  }
  if (perCentVal < userData.minScore) {
    userData.minScore = perCentVal;
  }
  setSessionData(userData);
  console.log("\nUser Data has been updated in localStorage:");
  console.log(getUserDataLogText(userData));
}

/*
 * Builds UI to ask user if they want to have another go at the quiz.
 * The UI frame is as follows:
 *
 *  <section id="page5-remove-section">
 *    <div class="row justify-content-center">
 *      <h3>Do you want another go at the Quiz?</h3>
 *    </div>
 *    <div
 *      class="row justify-content-center"
 *      style="margin-top: 20px;"
 *      id="another-go-block"
 *    >
 *      <div class="col-md-auto">
 *        <button type="button" value="yes" class="btn btn-primary">
 *          Yes
 *        </button>
 *      </div>
 *      <div class="col-md-auto">
 *        <button type="button" value="no" class="btn btn-primary">
 *          No
 *        </button>
 *      </div>
 *    </div>
 *  </section>
 *
 */
function doYouWantAnotherGoAtTheQuiz() {
  removeSectionParent.removeChild(removeSection);

  removeSection = document.createElement("section");
  removeSection.id = "page5-remove-section";
  removeSectionParent.appendChild(removeSection);

  var divEl1 = document.createElement("div");
  removeSection.appendChild(divEl1);
  divEl1.classList.add(...["row", "justify-content-center"]);

  var h3El = document.createElement("h3");
  divEl1.appendChild(h3El);
  h3El.innerHTML = "Do you want another go at the Quiz?";

  var divEl2 = document.createElement("div");
  divEl2.classList.add(...["row", "justify-content-center"]);
  divEl2.style.marginTop = "20px";
  divEl2.id = "another-go-block";
  removeSection.appendChild(divEl2);

  var divEl2a = document.createElement("div");
  divEl2a.classList.add("col-md-auto");
  divEl2.appendChild(divEl2a);

  var btnEl2a = document.createElement("button");
  btnEl2a.type = "button";
  btnEl2a.value = "yes";
  btnEl2a.classList.add(...["btn", "btn-primary"]);
  btnEl2a.innerHTML = "Yes";
  divEl2a.appendChild(btnEl2a);

  var divEl2b = document.createElement("div");
  divEl2b.classList.add("col-md-auto");
  divEl2.appendChild(divEl2b);

  var btnEl2b = document.createElement("button");
  btnEl2b.type = "button";
  btnEl2b.value = "no";
  btnEl2b.classList.add(...["btn", "btn-secondary"]);
  btnEl2b.innerHTML = "No";
  divEl2b.appendChild(btnEl2b);

  // add event listener to the DIV block holding the buttons
  divEl2.addEventListener("click", function(event) {
    var evTarget = event.target;
    var logText;
    console.log("Another Go DIV Event clicked");
    if (evTarget.tagName.toLowerCase().localeCompare("button") == 0) {
      logText = "Another Go Button Clicked. Value of button is: ";
      logText += evTarget.value;
      console.log(logText);
      // if value is "yes" navigate to start of quiz
      if (evTarget.value.toLowerCase().localeCompare("yes") == 0) {
        navigateToStartOfQuiz(userData);
      } else {
        // go to login page
        window.location.replace("./index.html");
      }
    }
  });
}

/*
 * Builds the following DIV element and returns it to be appended to the
 * removeSection:
 *  <div class="row justify-content-center">
 *    <div class="col-md-6">
 *      <h4>$(col1Text)</h4>
 *    </div>
 *    <div class="col-md-6">
 *      <h4>$(colText2)</h4>
 *    </div>
 *  </div>
 */
function getScoreRow(col1Text, col2Text) {
  var divEl = document.createElement("div");
  divEl.classList.add("row");
  divEl.classList.add("justify-content-center");

  var div1 = document.createElement("div");
  div1.classList.add("col-md-6");

  var div2 = document.createElement("div");
  div2.classList.add("col-md-6");

  divEl.appendChild(div1);
  divEl.appendChild(div2);

  var h4El_1 = document.createElement("h4");
  h4El_1.innerHTML = "" + col1Text;
  div1.appendChild(h4El_1);

  var h4El_2 = document.createElement("h4");
  h4El_2.innerHTML = "" + col2Text;
  div2.appendChild(h4El_2);

  return divEl;
}

/*
 * Returns a list of buttons from the options. Options contain possible answers as keys
 * and true/false as values
 */
function getListGroupButtons(options, classArray) {
  var retval = [];
  var optionsKeys = Object.keys(options);

  for (let index = 0; index < optionsKeys.length; index++) {
    var letterCode = getLetterCode(index);
    var optionKey = optionsKeys[index];
    var optionValue = options[optionKey];
    var optionButton = document.createElement("button");
    optionButton.setAttribute("type", "button");
    optionButton.setAttribute("data-correct", optionValue);
    // add the class list
    optionButton.classList.add(...classArray);
    // set the button text
    optionButton.innerHTML = getButtonDivSpanHTML(optionKey, letterCode);
    retval.push(optionButton);
  }
  return retval;
}

/*
 * Converts 0-3 to (A), (B), (C) and (D)
 */
function getLetterCode(index) {
  var letterCode;
  switch (index) {
    case 0:
      letterCode = "(A)";
      break;
    case 1:
      letterCode = "(B)";
      break;
    case 2:
      letterCode = "(C)";
      break;
    case 3:
      letterCode = "(D)";
      break;
  }
  return letterCode;
}

/*
 * <div class="row justify-content-around">
 *   <div class="col-md-2">
 *     <p class="question-label">
 *       &nbsp;&nbsp;$(letterCode)&nbsp;&nbsp;
 *     </p>
 *   </div>
 *   <div class="col-md-10">
 *     <p style="font-size: medium;text-align:left;">
 *       $(optionKey)
 *     </p>
 *   </div>
 * </div>
 *
 */
function getButtonDivSpanHTML(optionKey, letterCode) {
  var retval = '<div class="row justify-content-around">';
  retval += '<div class="col-md-2 align-self-center">';
  retval += '<p class="question-label">';
  retval += "&nbsp;&nbsp;" + letterCode + "&nbsp;&nbsp;";
  retval += "</p>";
  retval += "</div>";
  retval += '<div class="col-md-10">';
  //  retval += '<p style="font-size: medium;text-align:left;">';
  retval += '<p style="text-align:left;">';
  retval += optionKey;
  retval += "</p>";
  retval += "</div>";
  retval += "</div>";
  return retval;
}

function getLetterGrade(correctCount, totalCount) {
  var retval = "F";
  var percent = (correctCount / totalCount) * 100;
  if (percent >= 93) retval = "A";
  else if (percent >= 90) retval = "A-";
  else if (percent >= 87) retval = "B+";
  else if (percent >= 83) retval = "B";
  else if (percent >= 80) retval = "B-";
  else if (percent >= 77) retval = "C+";
  else if (percent >= 73) retval = "C";
  else if (percent >= 70) retval = "C-";
  else if (percent >= 67) retval = "D+";
  else if (percent >= 63) retval = "D";
  else if (percent >= 60) retval = "D-";
  else retval = "F";
  return retval;
}

function viewScoresEventListenerCallback(event) {
  // cancel the interval timer
  console.log("View Your Scores Button Pressed");
  if (quizTimeIntervalTimer != null) {
    clearInterval(quizTimeIntervalTimer);
  }
  if (
    allUserData != null &&
    userData != null &&
    removeSection != null &&
    removeSectionParent != null
  ) {
    displayStatistics();
  }
}

/*
 * Displays current user stats as well as best stats of all users
 * <section id="remove-section">
 *   <div class="row justify-content-around">
 *     <div class="col-md-6" id="user-stats">
 *       <h4 id="user-stat-header" style="color: blue;">
 *         Statistics for Chikeobi
 *       </h4>
 *       <div class="row">
 *         <div class="col-md">
 *           <h5>Max: 85%</h5>
 *           <h5>Min: 30%</h5>
 *           <h5>Quiz Taken: 20</h5>
 *         </div>
 *       </div>
 *     </div>
 *     <div class="col-md-6" id="top-score-summary">
 *       <h4 id="top-score-header" style="color: blue;">
 *         Top Score Summary
 *       </h4>
 *       <div class="row">
 *         <div class="col-md">
 *           <h5>Chikeobi Njaka: 85%</h5>
 *           <h5>Jane Doe: 30%</h5>
 *           <h5>Jack Doe: 20%</h5>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </section>
 *
 */
function displayStatistics() {
  if (removeSection === null || removeSectionParent === null) {
    return;
  }
  removeSectionParent.removeChild(removeSection);
  removeSection = document.createElement("section");
  removeSection.id = "remove-section";
  removeSectionParent.appendChild(removeSection);

  var div1 = document.createElement("div");
  div1.classList.add(...["row", "justify-content-around"]);
  removeSection.appendChild(div1);

  var div1a = document.createElement("div");
  div1a.classList.add("col-md-6");
  div1a.id = "user-stats";
  div1.appendChild(div1a);

  var h4a = document.createElement("h4");
  h4a.id = "user-stat-header";
  h4a.style.color = "blue";
  h4a.innerHTML = "Statistics for " + userData.firstName;
  div1a.appendChild(h4a);

  var div1aa = document.createElement("div");
  div1aa.classList.add("row");
  div1a.appendChild(div1aa);

  var div1aaa = document.createElement("div");
  div1aaa.classList.add("col-md");
  div1aa.appendChild(div1aaa);

  var h51a = document.createElement("h5");
  h51a.innerHTML = "Max: " + userData.maxScore + "%";
  var h51b = document.createElement("h5");
  h51b.innerHTML = "Min: " + userData.minScore + "%";
  var h51c = document.createElement("h5");
  h51c.innerHTML = "Quiz Taken: " + userData.sessionCount;
  div1aaa.appendChild(h51a);
  div1aaa.appendChild(h51b);
  div1aaa.appendChild(h51c);

  var div1b = document.createElement("div");
  div1b.id = "top-score-summary";
  div1.appendChild(div1b);

  var h4b = document.createElement("h4");
  h4b.id = "top-score-header";
  h4b.style.color = "blue";
  h4b.innerHTML = "Top Score Summary";
  div1b.appendChild(h4b);

  var div1baa = document.createElement("div");
  div1baa.classList.add("row");
  div1b.appendChild(div1baa);

  var div1baaa = document.createElement("div");
  div1baaa.classList.add("col-md");

  // build Key/Value pairs of subset of UserData that has as key the
  // UserName and max score as value
  var userIdMaxScore = {};
  var userIds = Object.keys(allUserData);
  for (let index = 0; index < userIds.length; index++) {
    var uid = userIds[index];
    var udata = allUserData[uid];
    if (udata != null) {
      var maxScore = 0;
      if (udata.maxScore != null) {
        maxScore = udata.maxScore;
      }
      var fullName = udata.firstName + " " + udata.lastName + " (" + uid + ")";
      userIdMaxScore[fullName] = maxScore;
    }
  }

  // sort key/value pair
  var sortedUidMaxScore = sortObjectPropertiesByValue(userIdMaxScore, true);
  var len = 5;
  if (sortedUidMaxScore.length < len) len = sortedUidMaxScore.len;
  var userIds = Object.keys(sortedUidMaxScore);
  var h5_2;
  for (let index = 0; index < len; index++) {
    h5_2 = document.createElement("h5");
    var fullName = userIds[index];
    h5_2.innerHTML = fullName + ": " + sortedUidMaxScore[fullName] + "%";
    div1baaa.appendChild(h5_2);
  }
  console.log(removeSection.outerHTML);
}

$(document).ready(function() {
  checkSessionData();
  var startQuizButtonEl = document.getElementById("start-quiz-btn");
  startQuizButtonEl.addEventListener("click", startQuizEventListenerCallback);
  var viewScoresButtonEl = document.getElementById("view-scores-btn");
  viewScoresButtonEl.addEventListener("click", viewScoresEventListenerCallback);
  // make sure button is enabled
  viewScoresButtonEl.disabled = false;
});
