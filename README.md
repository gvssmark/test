<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<STYLE>
body{max-width:360px; background:powderblue; top:0px; margin:auto; max-height:100%; }
p{max-width:360px; margin:auto; margin-left:5px;  }
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width:300px;
  margin-left:30px;
  border-radius:20px;
  
}

.button2 {background-color: #008CBA;} /* Blue */
.button3 {background-color: #f44336;} /* Red */ 
.button4 {background-color: #e7e7e7; color: black;} /* Gray */ 
.button5 {background-color: #555555;} /* Black */
</STYLE>


</head>
<body>
<div style="margin-top:0px; background:yellow; position:fixed; width:360px; height:40px; ">
<h4 align=center style="margin-top:15px; ">This is a Heading</h4>
</div>
<div style=" margin-top:0px;  ">
<br><br><br><br>
<button onclick="searchByName()"  class="button">Search by Name</button><br><br>
<button onclick="eventsThisWeek()" class="button button2">Events This Week</button><br><br>
<button onclick="showcities()" class="button button3">Lives in</button><br><br>
<button class="button button4">Who Worked in This Branch</button><br><br>
<button class="button button5">About</button><br>
<br><br><br><br><br><br><br><br>
</div>
<div style="bottom:0px; background:yellow; position:fixed; width:360px; height:40px; ">
<h4 align=center style="margin-top:15px; ">This is a Heading</h4>
</div>
</body>
</html>
