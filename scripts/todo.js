var todo_app = {

	createTask: function() {

		// var date = new Date();
		// var month = date.getMonth();
		// var day = date.getDay();
		// var year = date.getFullYear();
		// var hours = date.getHours();
		// var minutes = date.getMinutes();
		// var seconds = date.getSeconds();

		// var formattedDate = (parseInt(month) + 1) + '/' + day + '/' + year;
		// var formattedTime = hours + ':' + minutes + ':' + seconds;
		// console.log(formattedDate);
		// console.log(formattedTime);

		todo_item.setTaskText();

		}
};

var todo_item = {

	setTaskText: function() {
		var task_name = document.getElementById('new-task-field').value;
		var task_date_time = document.getElementById('date-time-field').value;
		var time_now = Date.now();

		task_date_time = new Date(task_date_time);

		todo_item.appendTask(task_name, task_date_time);

		time_left = task_date_time - time_now

	if(time_left * .25) {	
	setInterval(function() {
		document.getElementById("todo-items").style.background = "green";
	}, 1000);
	};	

	if(time_left * .50) {
	setInterval(function() {
		document.getElementById("todo-items").style.background = "yellow";
	}, 1000);
	};

	if(time_left * .75) {
	setInterval(function() {
		document.getElementById("todo-items").style.background = "orange";
	}, 1000);
	};

	if(time_left < 0) {
	setInterval(function() {
		document.getElementById("todo-items").style.background = "red";
		alert("This task is due!")
	}, 1000);
	};

	// // setInterval(function() {
	// 	document.getElementById("todo-items").style.background = "orange";
	// // }, time_left * .75);

	// // setInterval(function() {
	// 	document.getElementById("todo-items").style.background = "red";
	// // }, time_left * 1.0);
			

	},

	appendTask: function(task_name, task_date_time) {
		if (task_name) {
			var todo_items = document.getElementById('todo-items');
			var entry = document.createElement('li');
			entry.setAttribute("id", "entry" + task_name)


			completed_button = todo_item.completedButton(task_name);

			delete_button = todo_item.deleteButton(task_name);

			// formatted_time = formattedTime;
			// formatted_date = formattedDate;

			entry.appendChild(document.createTextNode(task_name));
			entry.appendChild(document.createTextNode(" | Due Date: " + task_date_time));
			entry.appendChild(completed_button);
			entry.appendChild(delete_button);
			// entry.appendChild(formatted_time);
			// entry.appendChild(formatted_date);
			todo_items.appendChild(entry);

			document.getElementById("completed_button" + task_name).addEventListener('click', function(event) {
				todo_item.completedTask(entry, task_name);
			});

			document.getElementById("delete_button" + task_name).addEventListener('click', function(event) {
				todo_item.deleteTask(entry, task_name);
			});

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