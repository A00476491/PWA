var db = new Dexie("todolistDatabase");
db.version(1).stores({ todolist: "id, title, priority, description" });

const getAllTodolistFromDB = () => db.todolist.toArray();

const addTodolistToDB = (title, priority, description, id = Date.now().toString()) =>
  db.todolist.put({ id, title, priority, description });

const deleteTodolistFromDB = (id) => db.todolist.delete(id);

const queryByTitle = (title) =>
  title ? db.todolist.where("title").equals(title).toArray() : [];
