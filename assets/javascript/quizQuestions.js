/* The follwoing Web Technology - HTML questions come from
 * https://www.avatto.com/computer-science/test/mcqs/web-technology/html/162/1.html
 */

const QUESTION1 =
  "Which of the following tag is used to mark a begining of paragraph";
const CHOICES1 = {
  "&lt;td&gt;": false,
  "&lt;br&gt;": false,
  "&lt;p&gt;": true,
  "&lt;tr&gt;": false
};

const QUESTION2 = "From which tag descriptive list starts ?";
const CHOICES2 = {
  "&lt;ll&gt;": false,
  "&lt;dd&gt;": false,
  "&lt;dl&gt;": true,
  "&lt;ds&gt;": false
};

const QUESTION3 = "Correct HTML tag for the largest heading is";
const CHOICES3 = {
  "&lt;head&gt;": false,
  "&lt;h6&gt;": false,
  "&lt;heading&gt;": false,
  "&lt;h1&gt;": true
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

const QUESTION9 = "Web pages starts with which of the following tag?";
const CHOICES9 = {
  "&lt;body&gt;": false,
  "&lt;title&gt;": false,
  "&lt;html&gt;": true,
  "&lt;form&gt;": false
};

const QUESTION10 = "What does HTML stand for?";
const CHOICES10 = {
  "Hyper Text Markup Language": true,
  "High Text Markup Language": false,
  "Hyper Tabular Markup Language": false,
  "None of the above": false
};

const QUESTION11 = "HTML is a subset of";
const CHOICES11 = {
  SGMT: false,
  SGML: true,
  SGMD: false,
  "None of the above": false
};

const QUESTION12 = "Which of the following is a container?";
const CHOICES12 = {
  "&lt;SELECT&gt;": false,
  "&lt;BODY&gt;": false,
  "&lt;INPUT&gt;": false,
  "Both (a) and (b)": true
};

const QUESTION13 =
  "The attribute, which define the relationship between current document and HREF'ed URL is";
const CHOICES13 = {
  REL: true,
  URL: false,
  REV: false,
  "All of the above": false
};

const QUESTION14 =
  "<DT> tag is designed to fit a single line of our web page but <DD> tag will accept a";
const CHOICES14 = {
  "line of text": false,
  "full paragraph": true,
  word: false,
  request: false
};

const QUESTION15 = "Character encoding is";
const CHOICES15 = {
  "method used to represent numbers in a character": false,
  "method used to represent character in a number": false,
  "a system that consists of a code which pairs each character with a pattern,sequence of natural numbers or electrical pulse in order to transmit the data": true,
  "none of the above": false
};

const QUESTION16 = "From which tag the descriptive list starts?";
const CHOICES16 = { "&lt;LL&gt;": false, "&lt;DD&gt;": false, "&lt;DL&gt;": true, "&lt;DS&gt;": false };

const QUESTION17 =
  "Correct HTML to left align the content inside a table cell is";
const CHOICES17 = {
  "&lt;tdleft&gt;": false,
  '&lt;td raligh = "left" &gt;': false,
  '&lt;td align = "left"&gt;': true,
  "&lt;td leftalign&gt;": false
};

const QUESTION18 =
  "The tag which allows you to rest other HTML tags within the description is";
const CHOICES18 = {
  "&lt;TH&gt;": false,
  "&lt;TD&gt;": false,
  "&lt;TR&gt;": false,
  "&lt;CAPTION&gt;": true
};

const QUESTION19 = "<Base> tag is designed to appear only between";
const CHOICES19 = {
  "&lt;HEAD&gt;": true,
  "&lt;TITLE&gt;": false,
  "&lt;BODY&gt;": false,
  "&lt;FORM&gt;": false
};

const QUESTION20 = "How can you open a link in a new browser window?";
const CHOICES20 = {
  '&lt; a href = "url" target = "new"&gt;': false,
  '&lt;a href = "url" target= "_blank"&gt;': true,
  '&lt;a href = "url".new&gt;': false,
  '&lt;a href = "url" target ="open"&gt;': false
};

const QUESTION21 = "A much better approach to establish the base URL is to use";
const CHOICES21 = {
  "BASE element": true,
  "HEAD element": false,
  "both (a) and (b)": false,
  "none of the above": false
};

const QUESTION22 =
  "The tag used to create a new list item and also include a hyperlink is";
const CHOICES22 = { "&lt;LI&gt;": true, "&lt;DL&gt;": false, "&lt;DD&gt;": false, "&lt;UL&gt;": false };

const QUESTION23 = "Can the element <First> be replaced with <first>";
const CHOICES23 = {
  "No, they represent different elements altogether": false,
  "Both are same": true,
  "First is correct only": false,
  "first is correct only": false
};

const QUESTION24 =
  "Any part of the graphic that is not included in another hot zone is considered to be part of";
const CHOICES24 = { rect: false, point: false, default: true, polygon: false };

const QUESTION25 = "Which of the tag is used to creates a number list?";
const CHOICES25 = {
  "&lt;LI&gt;": false,
  "&lt;OL&gt;": false,
  "&lt;LI&gt; and &lt;OL&gt;": true,
  "None of the above": false
};

const QUESTION26 = "<INPUT> is";
const CHOICES26 = {
  "format tag": false,
  "empty tag": true,
  "both (a) and (b)": false,
  "none of the above": false
};

const QUESTION27 = "The map definition file is generally stored in";
const CHOICES27 = {
  "CGI-BIN": true,
  "RECYCLE-BIN": false,
  BIN: false,
  "All of the above": false
};

const QUESTION28 = "The latest HTML standard is";
const CHOICES28 = {
  XML: false,
  SGML: false,
  "HTML 4.0": false,
  "HTML 5.0": true
};

const QUESTION29 =
  "The tag used to create a hypertext relationship between current document and another URL is";
const CHOICES29 = {
  "&lt;ISINDEX&gt;": false,
  "&lt;A&gt;": false,
  "&lt;LINK&gt;": true,
  "None of the above": false
};

const QUESTION30 = "The text inside the <TEXT AREA> tag works like";
const CHOICES30 = {
  "&lt;P&gt; formatted text": false,
  "&lt;T&gt; formatted text": false,
  "&lt;PRE&gt; formatted text": false,
  "None of the above": false
};

const QUESTIONS = {
  [QUESTION1]: CHOICES1,
  [QUESTION2]: CHOICES2,
  [QUESTION3]: CHOICES3,
  [QUESTION4]: CHOICES4,
  [QUESTION5]: CHOICES5,
  [QUESTION6]: CHOICES6,
  [QUESTION7]: CHOICES7,
  [QUESTION8]: CHOICES8,
  [QUESTION9]: CHOICES9,

  [QUESTION10]: CHOICES10,
  [QUESTION11]: CHOICES11,
  [QUESTION12]: CHOICES12,
  [QUESTION13]: CHOICES13,
  [QUESTION14]: CHOICES14,
  [QUESTION15]: CHOICES15,
  [QUESTION16]: CHOICES16,
  [QUESTION17]: CHOICES17,
  [QUESTION18]: CHOICES18,
  [QUESTION19]: CHOICES19,

  [QUESTION20]: CHOICES20,
  [QUESTION21]: CHOICES21,
  [QUESTION22]: CHOICES22,
  [QUESTION23]: CHOICES23,
  [QUESTION24]: CHOICES24,
  [QUESTION25]: CHOICES25,
  [QUESTION26]: CHOICES26,
  [QUESTION27]: CHOICES27,
  [QUESTION28]: CHOICES28,
  [QUESTION29]: CHOICES29,

  [QUESTION30]: CHOICES30
};
