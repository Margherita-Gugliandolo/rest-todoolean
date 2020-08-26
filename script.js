function addInsertListener(){
  var target = $('#add');
  target.click(insertTask);
}

function getTasks(){

  $.ajax({
      url: 'http://157.230.17.132:3009/todos',
      method:'GET',
      success: function(data){
        printTasks(data);
      },
      error: function(err){
        console.log('err', err);
      }
  })
}

function insertTask(){

var target = $('#task_text');
var text = target.val();

 $.ajax({

   url: 'http://157.230.17.132:3009/todos',
   method:'POST',
   data:{
     text:text
   }
  });

}

function printTasks(tasks){

  var target = $('#tasks');
  target.text('');

  for (var i=0; i<tasks.length; i++){

    var task = tasks[i];
    target.append(`<li>${task.text} - <span data-id="${task.id}" class="click"><b>X</b></span></li>`);
  }
}

function addDeleteListener(){
  $(document).on('click', '.click', deleteTask);
}

function deleteTask (){

  var button = $(this);
  var id = button.data('id');

  $.ajax({

   url: `http://157.230.17.132:3009/todos/${id}`,
   method: 'DELETE',
   success: function(data){
     console.log('data', data);
     getTasks();
   },
   error: function(err){
     console.log('err', err);
   }

 });
}


function init(){
  addInsertListener();
  getTasks();
  insertTask();
  addDeleteListener();
  console.log('hello world');
}
$(document).ready(init);
