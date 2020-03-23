console.log("Value of USER_DATA_KEY is " + USER_DATA_KEY);

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
  var btnDisable = false;
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
  return true;
}

function disableAndFadeButton(btn) {
  btn.disabled = true;
  btn.style.opacity = 0.6;
}


if (checkSessionData() === false) {
  return;
}
