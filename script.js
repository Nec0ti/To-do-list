function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskDateInput = document.getElementById("taskDate");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() === "" || taskDateInput.value === "") {
      alert("Please enter a task and select a date!");
      return;
  }

  var li = document.createElement("li");
  var deleteButton = document.createElement("button");

  li.textContent = `${taskInput.value} - ${taskDateInput.value}`;

  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
      this.parentNode.remove();
  });

  li.appendChild(deleteButton);

  taskList.appendChild(li);
  taskInput.value = "";
  taskDateInput.value = "";

  // Parse the selected date and time
  var selectedDate = new Date(taskDateInput.value);
  
  // Set a timer to send a notification when the selected date and time is reached
  var currentTime = new Date().getTime();
  var timeToNotification = selectedDate - currentTime;

  if (timeToNotification > 0) {
      setTimeout(function () {
          showNotification("Task Reminder", `Task "${taskInput.value}" is due!`);
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
