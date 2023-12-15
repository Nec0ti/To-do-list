var taskList = JSON.parse(localStorage.getItem("taskList")) || [];

// Function to render tasks in the DOM
function renderTasks() {
    var taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    taskList.forEach(function (task) {
        var li = document.createElement("li");
        var deleteButton = document.createElement("button");

        li.textContent = `${task.description} - ${task.date}`;
        
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task);
        });

        li.appendChild(deleteButton);
        taskListElement.appendChild(li);
    });
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskDateInput = document.getElementById("taskDate");

    if (taskInput.value.trim() === "" || taskDateInput.value === "") {
        alert("Please enter a task and select a date!");
        return;
    }

    var newTask = {
        description: taskInput.value,
        date: taskDateInput.value
    };

    taskList.push(newTask);

    // Save the updated task list to local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));

    // Render the updated task list in the DOM
    renderTasks();

    taskInput.value = "";
    taskDateInput.value = "";

    // Set a timer to send a notification when the task's due time is reached
    scheduleNotification(newTask);
}

function deleteTask(task) {
  var taskIndex = taskList.indexOf(task);

  if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);

      // Save the updated task list to local storage
      localStorage.setItem("taskList", JSON.stringify(taskList));

      // Render the updated task list in the DOM
      renderTasks();
  }
}


function scheduleNotification(task) {
  var selectedDate = new Date(task.date);
  var currentTime = new Date().getTime();
  var timeToNotification = selectedDate - currentTime;

  if (timeToNotification > 0) {
      setTimeout(function () {
          showNotification("Task Reminder", `Task "${task.description}" is due!`);
      }, timeToNotification);
  } else {
      alert("Please select a future date and time for the task!");
  }
}

function showNotification(title, message) {
  // Check if the browser supports notifications
  if ('Notification' in window) {
      // Check if permission is granted
      if (Notification.permission === 'granted') {
          // Create a notification
          var notification = new Notification(title, { body: message });
      } else if (Notification.permission !== 'denied') {
          // Request permission from the user
          Notification.requestPermission().then(function (permission) {
              // If permission is granted, create a notification
              if (permission === 'granted') {
                  var notification = new Notification(title, { body: message });
              }
          });
      }
  }
}


renderTasks();