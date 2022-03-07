"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoServices_1 = require("./todoServices");
exports.handler = async (event) => {
    switch (event.info.fieldName) {
        case "addTodo":
            return await todoServices_1.addTodo(event.arguments.todo);
        case "getTodos":
            return await todoServices_1.getTodos();
        case "deleteTodo":
            return await todoServices_1.deleteTodo(event.arguments.todoId);
        case "updateTodo":
            return await todoServices_1.updateTodo(event.arguments.todo);
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBMkU7QUFZM0UsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBbUIsRUFBRSxFQUFFO0lBQzlDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDNUIsS0FBSyxTQUFTO1lBQ1osT0FBTyxNQUFNLHNCQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLFVBQVU7WUFDYixPQUFPLE1BQU0sdUJBQVEsRUFBRSxDQUFDO1FBQzFCLEtBQUssWUFBWTtZQUNmLE9BQU8sTUFBTSx5QkFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsS0FBSyxZQUFZO1lBQ2YsT0FBTyxNQUFNLHlCQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRDtZQUNFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWxldGVUb2RvLCBnZXRUb2RvcywgdXBkYXRlVG9kbywgYWRkVG9kbyB9IGZyb20gXCIuL3RvZG9TZXJ2aWNlc1wiO1xuaW1wb3J0IFRvZG8gZnJvbSBcIi4vbW9kZWxcIjtcbnR5cGUgQXBwU3luY0V2ZW50ID0ge1xuICBpbmZvOiB7XG4gICAgZmllbGROYW1lOiBzdHJpbmc7XG4gIH07XG4gIGFyZ3VtZW50czoge1xuICAgIHRvZG9JZDogc3RyaW5nO1xuICAgIHRvZG86IFRvZG87XG4gIH07XG59O1xuXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFwcFN5bmNFdmVudCkgPT4ge1xuICBzd2l0Y2ggKGV2ZW50LmluZm8uZmllbGROYW1lKSB7XG4gICAgY2FzZSBcImFkZFRvZG9cIjpcbiAgICAgIHJldHVybiBhd2FpdCBhZGRUb2RvKGV2ZW50LmFyZ3VtZW50cy50b2RvKTtcbiAgICBjYXNlIFwiZ2V0VG9kb3NcIjpcbiAgICAgIHJldHVybiBhd2FpdCBnZXRUb2RvcygpO1xuICAgIGNhc2UgXCJkZWxldGVUb2RvXCI6XG4gICAgICByZXR1cm4gYXdhaXQgZGVsZXRlVG9kbyhldmVudC5hcmd1bWVudHMudG9kb0lkKTtcbiAgICBjYXNlIFwidXBkYXRlVG9kb1wiOlxuICAgICAgcmV0dXJuIGF3YWl0IHVwZGF0ZVRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiJdfQ==