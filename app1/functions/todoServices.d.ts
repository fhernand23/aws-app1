import Todo from "./model";
export declare function getTodos(): Promise<any>;
export declare function addTodo(todo: Todo): Promise<Todo | null>;
export declare function updateTodo(todo: any): Promise<any>;
export declare function deleteTodo(todoId: string): Promise<string | null>;
