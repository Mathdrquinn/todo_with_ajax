var itemTmpl = [
  "<% _.each(items, function(element, index, list) { %>",
  "<% if (element.completed === \"false\") %>",
  "<div class=\"itemHolder <%= element.completed %>\">",
    "<div class=\"icon\"><span class=\"icon-checkmark-2\"></span><span class=\"icon-checkmark hide\"></span></div>",
    "<p id=\"<%= element._id %>\" data-itemid=\"<%= element._id %>\" class=\"item zero\"> <%= element.name %> <span class=\"icon-close\"></p>",
    "<form id=\"editor\" class=\"hide\">",
      "<input id=\"editorInput\" name=\"todo\" type=\"text\" class=\"item zero\" placeholder=\"<%= element.name %>\" required=\"required\">",
    "</form>",
    "<button class=\"hide\" id=\"editorSubmit\">Edit</button>",
  "</div>",
  "<% if (element.completed === \"true\") %>",
  "<div class=\"itemHolder <%= element.completed %>\">",
    "<div class=\"icon\"><span class=\"icon-checkmark-2 hide\"></span><span class=\"icon-checkmark\"></span></div>",
    "<p id=\"<%= element._id %>\" data-itemid=\"<%= element._id %>\" class=\"item zero strike\"> <%= element.name %> <span class=\"icon-close\"></p>",
  "</div>",
  "<% }); %>"
].join('\n');
