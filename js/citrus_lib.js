function do_includes() {
  var nodes = document.querySelectorAll("[include]");
  for (let i = 0; i < nodes.length; i++) {
    var include_url = nodes[i].getAttribute("include");
    var http_req = new XMLHttpRequest();
    http_req.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          nodes[i].innerHTML = this.responseText;
        }
        nodes[i].removeAttribute("include");
        do_includes();
        return;
      }
    }
    http_req.open("GET", include_url, true);
    http_req.send();
    return;
  }
};

function expand_blog_post(button_id, content_id) {
  var button = document.querySelectorAll(`[id=${button_id}]`);
  var content = document.querySelectorAll(`[id=${content_id}]`);
  if (button[0] && content[0])
  {
    if (content[0].style.maxHeight != "fit-content")
    {
      button[0].innerHTML = "show less";
      content[0].style.maxHeight = "fit-content";
    }
    else
    {
      button[0].innerHTML = "show more";
      content[0].style.maxHeight = "120px";
    }
  }
};

function on_page_load()
{
  do_includes();
};
