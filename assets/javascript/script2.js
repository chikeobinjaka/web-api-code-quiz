console.log("Value of USER_DATA_KEY is " + USER_DATA_KEY);

/*
Reads the session data from the URL and checks against the information in the
 database as well as compare the time to the current time. If more than 
 SESSION_DELAY_TIMEOUT milliseconds has passed, the session will have timed out
  and the start quiz button will be disabled
*/
function checkSessionData() {
  var queryString = window.location.search;
  console.log("Query String: " + queryString);
  var urlParams = new URLSearchParams(queryString);
  var userId, sessionId, sessionTime, urlSessionMilli, sessionMilli;
  var userData, currentTimeMilli;
  var btnDisable = false;
  var startQuizBtn = document.getElementById("start-quiz-btn");
  var errEl = document.getElementById("start-quiz-error");
  var errText;

  currentTimeMilli = new Date().getTime();
  // check for userId in URL parameters
  if ((userId = urlParams.get("userId")) == null) {
    startQuizBtn.disabled = true;
    errText = "Error in page URL: missing <strong>";
    errText += "userId</strong> parameter";
    errEl.innerHTML = errText;
    return false;
  }
  console.log("URL userID = " + userId);
  // check for sessionId in URL parameters
  if ((sessionId = urlParams.get("sessionId")) == null) {
    startQuizBtn.disabled = true;
    errText = "Error in page URL: missing <strong>";
    errText += "sessionId</strong> parameter";
    errEl.innerHTML = errText;
    return false;
  }
  console.log("URL sessionId = " + sessionId);
  // check for sessionTime in URL parameters
  if ((sessionTime = urlParams.get("sessionTime")) == null) {
    startQuizBtn.disabled = true;
    errText = "Error in page URL: missing <strong>";
    errText += "sessionTime</strong> parameter";
    errEl.innerHTML = errText;
    return false;
  }
  console.log("URL SessionTime = " + sessionTime);
  // check for userData in localStorage data
  if ((userData = getUserData(userId)) != null) {
    startQuizBtn.disabled = true;
    errText = "Unable to initialize userID <strong>";
    errText += userId + "</strong>";
    errEl.innerHTML = errText;
    return false;
  }

  // make sure URL sessionId is the same as userData sessionId
  if (sessionId.localeCompare(userData.sessionId) === 0) {
    startQuizBtn.disabled = true;
    errText = "URL sessionId (" + sessionId;
    errText += ") does not match User Data sessionId (";
    errText += userData.sessionId + ")";
    errEl.innerHTML = errText;
    return false;
  }
  // check if the session IDs can be converted to numbers
  if (
    (urlSessionMilli = Number.parseInt(sessionTime)) === NaN ||
    (sessionMilli = Number.parseInt(userData.sessionTime)) != NaN
  ) {
    startQuizBtn.disabled = true;
    errEl.innerHTML =
      "Error with sessionTime URL parameter or stored session time";
    return false;
  }
  // check if current session time is with the delay
  if (currentTimeMilli - urlSessionMilli > SESSION_TIMEOUT_DELAY) {
    startQuizBtn.disabled = true;
    errEl.innerHTML = "Session Timeout Error";
    return false;
  }
  console.log(getUserDataLogText(userData));
}

checkSessionData();
