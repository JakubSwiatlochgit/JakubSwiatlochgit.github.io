export interface TodoItem {
  _id: string;
  desc: string;
  completed: boolean;
  isEditing?: boolean;
  isDaily: boolean;
  category: string;
}

export interface TodoFormProps {
  addTodo: (todo: { value: string; isDaily: boolean; category: string }) => void;
}

export interface TodoProps {
  task: TodoItem;
  toggleComplete: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
  handleEdit: (id: string, newDesc: string) => void;
}
