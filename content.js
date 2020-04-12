function setCookie(cname, cdata, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expiry = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cdata + ";" + expiry + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  cookies = decodeURIComponent(document.cookie);
  cdata = cookies.split(";");
  for (var i =0; i<cdata.length; i++) {
    var c = cdata[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length+1, c.length);
    }
  }
  return 0;
}
if (getCookie('aaojhandle')) {
  var handle = getCookie('aaojhandle');
}
else {
  handle = prompt("Please enter your codeforces handle.");
  setCookie('aaojhandle', handle, 365*10);
}
xhttp = new XMLHttpRequest();
url = "https://codeforces.com/api/user.status?handle=" + handle + "&from=1&count=100000";
xhttp.open("GET",url, true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status==200) {
    const jsonResponse = JSON.parse(this.responseText);
    const user_status = jsonResponse['result'];
    var ok_problems = [];
    for (var i=0; i<user_status.length; i++) {
      if (user_status[i]['verdict'] == "OK")  {
        var problem_id = user_status[i]['problem']['contestId'] + user_status[i]['problem']['index'];
        ok_problems.push(problem_id);
      }
    }
    var problems_list = $("table").get(1);
    var problems_count = problems_list.rows.length;
    for (var i=1; i<problems_count; i++) {
      var problem_x_row = problems_list.rows[i];
      var problem_x_cell = problem_x_row.cells[1].innerHTML;
      var problem_x_data = problem_x_cell.split("/");
      var problem_x_contest = problem_x_data[5];
      var problem_x_index = problem_x_data[6].split('"')[0];
      var problem_x = problem_x_contest + problem_x_index;
      if (ok_problems.includes(problem_x)) {
        problem_x_row.style = "background-color :  #00cc66;";
      }
    }
  }
}
