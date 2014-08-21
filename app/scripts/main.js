var item;

$(document).ready(function () {
  console.log('main.js is go');
  milk.init();
});

var milk = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/rphuber",
  init: function () {
    console.log('init start');
    milk.initEvents();
    milk.initStyling();
    console.log('init end');
  },
  initEvents: function () {
    console.log('events start');

    $('#newitem').on('click', '.icon-angle-double-down', function(event) {
      event.preventDefault();
      console.log('submit');

      var newChore = {
        name: $('#newitem').find('#inputItem').val(),
        completed: false
      };

      console.log(newChore.name);
      milk.createChores(newChore);
      $(this).closest('#newitem').find('#inputItem').val('');
    });

    $('#newitem').on('submit', function(event) {
      event.preventDefault();
      console.log('submit');

      var newChore = {
        name: $('#newitem').find('#inputItem').val(),
        completed: false
      };

      console.log(newChore.name);
      milk.createChores(newChore);
      $(this).closest('#newitem').find('#inputItem').val('');
    });

    $('#itemList').on('click', '.icon-close', function(event) {
      event.preventDefault();
      $(this).css('text-shadow', 'none');

      var $position = $(this).closest('p').data('itemid');
      console.log($position);

      milk.deleteChores($position);
    });

    $('#itemList').on('click', '.icon-checkmark-2', function(event) {
      event.preventDefault();
      $(this).toggleClass('hide');
      $(this).siblings('span').toggleClass('hide');

      $(this).closest('.itemHolder').children('p').css('text\-decoration', 'line-through');
      $(this).closest('.itemHolder').children('p').css('color', 'grey');

      var id = $(this).closest('.itemHolder').find('p').data('itemid');
      console.log(id);

      var updatedItem = {
          completed:true,
        };

      milk.editStatus(id, updatedItem);

    });

    $('#itemList').on('click', '.icon-checkmark', function(event) {
      event.preventDefault();
      $(this).toggleClass('hide');
      $(this).siblings('span').toggleClass('hide');

      $(this).closest('.itemHolder').children('p').css('text\-decoration', 'none');
      $(this).closest('.itemHolder').children('p').css('color', 'black');

      var id = $(this).closest('.itemHolder').find('p').data('itemid');
      console.log(id);

      var updatedItem = {
          completed:false,
        };

      milk.editStatus(id, updatedItem);
    });

    $('#info').on('click', '#active', function() {
      console.log('filter active');
      $(this).siblings().css('font\-weight', 'normal');
      $(this).css('font\-weight', 'bold');
      $(this).closest('#info').siblings('#itemList').find('.false').fadeIn();
      $(this).closest('#info').siblings('#itemList').find('.true').fadeOut();
    });

    $('#info').on('click', '#completed', function() {
      console.log('filter completed');
      $(this).siblings().css('font\-weight', 'normal');
      $(this).css('font\-weight', 'bold');
      $(this).closest('#info').siblings('#itemList').find('.true').fadeIn();
      $(this).closest('#info').siblings('#itemList').find('.false').fadeOut();

    });

    $('#info').on('click', '#all', function() {
      console.log('filter all');
      $(this).siblings().css('font\-weight', 'normal');
      $(this).css('font\-weight', 'bold');
      $(this).closest('#info').siblings('#itemList').find('.false').fadeIn();
      $(this).closest('#info').siblings('#itemList').find('.true').fadeIn();
    });

    $('#right').on('click', 'button', function() {
      console.log('clear completed');
      var length = items.length;
      for(var j = 0; j < length; j++) {
        if (items[j].completed === 'true')
          milk.deleteChores(items[j]._id);
      }
    });

    //edit todo
    $('#itemList').on('submit', '#editor', function (e) {
      e.preventDefault();
      var id = $(this).siblings('p').data('itemid');
      var newName = {
        name: $(this).children('input').val()
      }
      console.log(newName);
      console.log(id);
      $(this).toggleClass('hide');
      // $(this).siblings('form').toggleClass('hide');
      milk.editStatus(id, newName);

    });

    $('#itemList').on('dblclick', 'p', function() {
      $(this).siblings('#editorSubmit').toggleClass('hide');
      $(this).siblings('form').toggleClass('hide');
    })

    console.log('events end');

  },
  initStyling: function () {
    console.log('styling start');
    milk.getChores();
    console.log('styling end');

  },
  renderChores: function (tmpl, data, $target) {
    console.log('render start');

    var markup = _.template(tmpl, data);

    $target.html(markup);

    console.log('render end');

  },
  itemCount: function(arr) {
    console.log(arr.length);
    var length = arr.length;
    window.incompleteCount = 0;
    window.completeCount = 0;
    for (var i = 0; i < length; i++) {
      if (arr[i].completed === 'false') {
        incompleteCount++;
      }
      else{
        completeCount++;
      }
    }
    console.log(completeCount);
    $('#left').html('<strong>' + incompleteCount + '</strong> item(s) left');
    $('#right').children('button').html('Clear completed (' + completeCount + ')');
  },
  getChores: function () {
    console.log('get start');

    $.ajax({
      url: milk.url,
      type: 'GET',
      success: function (response) {
        var items = window.items = response;
        milk.itemCount(items);
        milk.renderChores(itemTmpl, items, $("#itemList"));

      }
    });

    console.log('get end');

  },
  createChores: function (thing) {
    console.log('create start');

    $.ajax({
        url: milk.url,
        data: thing,
        type: 'POST',
        success: function (response) {
          milk.getChores();

        }
      });

    console.log('create end');

  },
  deleteChores: function (id) {
    console.log('delete start');

    $.ajax({
      url: milk.url + "/" + id,
      type: 'DELETE',
      success: function () {
          milk.getChores();
      }
    });

    console.log('delete end');

  },
  updateChores: function () {

  },
  editStatus: function (id, updatedItem) {

    $.ajax({
      url: milk.url + "/" + id,
      type: "PUT",
      data: updatedItem,
      success: function (response) {
        // something goes here
        console.log(response);
        milk.getChores();
      }
    });
  }
}
