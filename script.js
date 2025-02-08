const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => 
      navigator.serviceWorker.register("/sw.js").then(
        () => console.log("ServiceWorker registered"),
        (err) => console.warn("ServiceWorker failed", err)
      )
    );
  }
};

const main = async () => {
  const form = document.querySelector("form"),
    titleInput = document.querySelector("[name='title']"),
    priorityInput = document.querySelector("[name='priority']"),
    descriptionInput = document.querySelector("[name='description']"),
    todolistList = document.getElementById("todolist");

  let todolistData = (await getAllTodolistFromDB()) || [];

  const addTodolist = (title, priority, description, id = Date.now().toString()) => {
    if (todolistData.some((t) => t.title === title && t.priority === priority && t.description === description)) {
      return alert("Task already exists!");
    }

    const div = document.createElement("div");
    div.classList.add("todolist");
    div.dataset.id = id;
    div.innerHTML = `
      <input type="checkbox" name="mark as completed"> Mark as completed ｜  
      <button class="delete-button">Delete</button>
      <h1>${title}</h1>
      <h2>${priority}</h2>
      <p>${description}</p>
    `;

    div.querySelector(".delete-button").addEventListener("click", () => {
      div.remove();
      todolistData = todolistData.filter((t) => t.id !== id);
      localStorage.setItem("todolist", JSON.stringify(todolistData));
      deleteTodolistFromDB(id);
    });

    todolistList.appendChild(div);
    todolistData.push({ id, title, priority, description });
    localStorage.setItem("todolist", JSON.stringify(todolistData));
    addTodolistToDB(title, priority, description, id);
    form.reset();
  };

  todolistData.forEach(({ title, priority, description, id }) => addTodolist(title, priority, description, id));

  form.onsubmit = (e) => {
    e.preventDefault();
    addTodolist(titleInput.value, priorityInput.value, descriptionInput.value);
  };
};

registerServiceWorker();
main();
