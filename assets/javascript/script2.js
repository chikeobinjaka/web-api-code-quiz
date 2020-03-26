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
 * will start the overall timer
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
  var questionsKeys = Object.keys(HTML_QUESTIONS);
  // get a random question
  var qlen = questionsKeys.length;
  var pointer = Math.floor(Math.random() * qlen);
  // get the question
  var question = questionsKeys[pointer];
  var options = HTML_QUESTIONS[question];

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

function quizResultEventListenerCallback(event) {
  var targetEl = event.target;
  var logText = "A yes/no button was clicked. The clicked\n";
  logText += "item is a " + targetEl.tagName;
  if (targetEl.tagName.toLowerCase().localeCompare("button") != 0) {
    return;
  }
  if (targetEl.value.toLowerCase().localeCompare("yes") == 0) {
    saveScore(perCentVal);
    wannaPlayAgain();
  } else {
    wannaPlayAgain();
  }
  logText += "\n " + targetEl.value + " Button Clicked";
  console.log(logText);
}

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

function wannaPlayAgain() {
  removeSectionParent.removeChild(removeSection);
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
checkSessionData();
var startQuizButtonEl = document.getElementById("start-quiz-btn");
startQuizButtonEl.addEventListener("click", startQuizEventListenerCallback);
