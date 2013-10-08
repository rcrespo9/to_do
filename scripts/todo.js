var todo_app = {

  createTask: function() {
    todo_item.setTaskText();
  },

  timeAlerts: function(task_name, task_due_date_time) {

    var completed_button = document.getElementById('completed_button' + task_name)

    if (completed_button) {
      var due_date = new Date(task_due_date_time);
      var now = new Date();
      var time_left = due_date - now

      if (time_left > 60000) {
        document.getElementById(task_name).style.color = "green";
      } else if (time_left > 30000){
        document.getElementById(task_name).style.color = "yellow";
      } else if (time_left <= 30000 && time_left > 0) {
        document.getElementById(task_name).style.color = "orange";
      } else {
		clearTimeout();
        document.getElementById(task_name).style.color = "red";
		alert("You missed your deadline!")
      }

      console.log(time_left);

      setTimeout(function() {
        todo_app.timeAlerts(task_name,task_due_date_time);
      }, 1000)
    }
  },
};

var todo_item = {
  
  setTaskText: function() {
    var task_name = document.getElementById('new-task-field').value;
    var task_due_date_time = new Date(document.getElementById('due-date-time-field').value);
    
    todo_item.appendTask(task_name, task_due_date_time);
    

  },

  appendTask: function(task_name, task_due_date_time) {
    if (task_name) {
      var todo_items = document.getElementById('todo-items');
      var entry = document.createElement('li');
      entry.setAttribute("id", task_name)

      completed_button = todo_item.completedButton(task_name);

      delete_button = todo_item.deleteButton(task_name);
      

      entry.appendChild(document.createTextNode(task_name));
      entry.appendChild(document.createTextNode(" Due date: " + task_due_date_time));
      entry.appendChild(completed_button);
      entry.appendChild(delete_button);
    
      todo_items.appendChild(entry);

      document.getElementById("completed_button" + task_name).addEventListener('click', function(event) {
        todo_item.completedTask(entry, task_name);
      });

      document.getElementById("delete_button" + task_name).addEventListener('click', function(event) {
        todo_item.deleteTask(entry, task_name);
      });

      todo_app.timeAlerts(task_name, task_due_date_time);


		} else {
			alert('nope!');
		}
	},

	completedButton: function(task_name) {
		var completed_button = document.createElement('button');
		var text = document.createTextNode('Completed')
		completed_button.appendChild(text);
		completed_button.setAttribute("id", "completed_button" + task_name)



		return completed_button;

	},

	completedTask: function(entry, task_name) {
		console.log(entry)
		console.log(task_name)
		current_entry = entry

		var todo_items = document.getElementById('todo-items');
		var completed_button = document.getElementById('completed_button' + task_name)
		todo_items.removeChild(current_entry);

		var completed_items = document.getElementById('completed-items');
		current_entry.removeChild(completed_button);
		completed_items.appendChild(current_entry);

	},

	deleteButton: function(task_name) {
		var delete_button = document.createElement('button');
		var text = document.createTextNode('Delete')
		delete_button.appendChild(text);
		delete_button.setAttribute("id", "delete_button" + task_name)

		return delete_button;
	},

	deleteTask: function(entry, task_name) {
		console.log(entry)
		console.log(task_name)
		current_entry = entry
		var todo_items = document.getElementById('todo-items');
		var completed_items = document.getElementById('completed-items');

		var completed_button = document.getElementById('completed_button' + task_name)

		if (completed_button) {
			todo_items.removeChild(current_entry);
		} else {
			completed_items.removeChild(current_entry);
		}

	}

};


window.onload = function() {
	document.getElementById('add-item').addEventListener('click', function(event) {
    	todo_app.createTask();

  	});

}