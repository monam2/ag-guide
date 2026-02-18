import {
  addTodo,
  getTodos,
  toggleTodo,
  deleteTodo,
  updateTodo,
  __setTodos,
} from "@/lib/todo";

describe("addTodo 기능", () => {
  beforeEach(() => {
    __setTodos([]);
  });

  it("새로운 할 일을 추가하고 목록에 포함되어야 한다", () => {
    const todo = addTodo("Test Todo");
    const todos = getTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual(todo);
    expect(todo.title).toBe("Test Todo");
    expect(todo.completed).toBe(false);
  });

  it("각 할 일은 고유한 ID와 생성 시간을 가져야 한다", () => {
    const todo1 = addTodo("Todo 1");
    // Ensure we wait a bit or just assume rapid execution is fine for unique ID if using uuid.
    // For createdAt, tests run fast so they might be same millisecond, but instance check is enough.
    const todo2 = addTodo("Todo 2");
    expect(todo1.id).not.toBe(todo2.id);
    expect(todo1.createdAt).toBeInstanceOf(Date);
  });

  it("빈 제목으로 할 일을 추가할 때 에러를 발생시켜야 한다", () => {
    expect(() => addTodo("")).toThrow("할 일 제목은 비어있을 수 없습니다.");
    expect(() => addTodo("   ")).toThrow("할 일 제목은 비어있을 수 없습니다.");
  });
});

describe("getTodos 기능", () => {
  beforeEach(() => {
    __setTodos([]);
  });

  it("초기에는 빈 목록을 반환해야 한다", () => {
    const todos = getTodos();
    expect(todos).toEqual([]);
  });

  it("추가된 모든 할 일을 반환해야 한다", () => {
    addTodo("Todo 1");
    addTodo("Todo 2");
    const todos = getTodos();
    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe("Todo 1");
    expect(todos[1].title).toBe("Todo 2");
  });

  it("반환된 배열은 원본 배열의 복사본이어야 한다 (불변성 유지)", () => {
    addTodo("Todo 1");
    const todos1 = getTodos();
    todos1[0].title = "Modified";
    const todos2 = getTodos();
    expect(todos2[0].title).toBe("Todo 1");
  });
});

describe("toggleTodo 기능", () => {
  beforeEach(() => {
    __setTodos([]);
  });

  it("특정 ID의 할 일 완료 상태를 토글해야 한다", () => {
    const todo = addTodo("Todo");
    const toggledTodo = toggleTodo(todo.id);
    expect(toggledTodo.completed).toBe(true);
    const toggledAgain = toggleTodo(todo.id);
    expect(toggledAgain.completed).toBe(false);
  });

  it("존재하지 않는 ID로 토글을 시도하면 에러를 발생시켜야 한다", () => {
    expect(() => toggleTodo("non-existent-id")).toThrow(
      "해당 ID의 할 일을 찾을 수 없습니다.",
    );
  });
});

describe("deleteTodo 기능", () => {
  beforeEach(() => {
    __setTodos([]);
  });

  it("특정 ID의 할 일을 삭제해야 한다", () => {
    const todo = addTodo("Todo");
    deleteTodo(todo.id);
    expect(getTodos()).toHaveLength(0);
  });

  it("존재하지 않는 ID로 삭제를 시도하면 에러를 발생시켜야 한다", () => {
    expect(() => deleteTodo("non-existent-id")).toThrow(
      "해당 ID의 할 일을 찾을 수 없습니다.",
    );
  });
});

describe("updateTodo 기능", () => {
  beforeEach(() => {
    __setTodos([]);
  });

  it("특정 ID의 할 일 제목을 수정해야 한다", () => {
    const todo = addTodo("Todo");
    const updatedTodo = updateTodo(todo.id, "Updated Todo");
    expect(updatedTodo.title).toBe("Updated Todo");
    expect(getTodos()[0].title).toBe("Updated Todo");
  });

  it("존재하지 않는 ID로 수정을 시도하면 에러를 발생시켜야 한다", () => {
    expect(() => updateTodo("non-existent-id", "Updated")).toThrow(
      "해당 ID의 할 일을 찾을 수 없습니다.",
    );
  });

  it("수정할 제목이 비어있으면 에러를 발생시켜야 한다", () => {
    const todo = addTodo("Todo");
    expect(() => updateTodo(todo.id, "")).toThrow(
      "할 일 제목은 비어있을 수 없습니다.",
    );
    expect(() => updateTodo(todo.id, "   ")).toThrow(
      "할 일 제목은 비어있을 수 없습니다.",
    );
  });
});
