const { createTask } = require("../app/services/task.service")


test("Testing create Task", async () => {
    expect(
    await createTask("kautilya","searching for jobs","2023-02-10","pending")
    ).toEqual({
        taskName : "kautilya",
        taskDescription : "searching for jobs",
        dueDate : "2023-02-10",
        status : "pending",
        id : expect.any(String)
    })
})