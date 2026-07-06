import Task from "../models/Task.js";

// GET -> trả về danh sách việc cần làm
export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 2025-12-4 00:00
      break;
    }
    case "week": {
      const day = now.getDay() || 7;
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0; // kiểm tra xem item đầu tiên của mảng activeCount có phải undefined không? || nếu là mảng rổng thì giá trị default = 0
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// POST
export const createTask = async (req, res) => {
  // res.status(201).json({ message: "Nhiem vu moi da duoc them vao thanh cong" });
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Tiêu đề nhiệm vụ là bắt buộc" });
    }

    const task = new Task({ title: title.trim() });
    const newTask = await task.save(); // lện này sẽ lưu taks mới xuống database

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// PUT
export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body; // lấy những field có thể update từ schema
    const payload = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: "Tiêu đề nhiệm vụ là bắt buộc" });
      }
      payload.title = title.trim();
    }

    if (status !== undefined) payload.status = status;
    if (completedAt !== undefined) payload.completedAt = completedAt;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // lấy id từ url
      payload,
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại!" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Lỗi khi gọi updatedTask", error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại!" });
    }

    res.status(200).json(deleteTask);
  } catch (error) {
    console.log("Lỗi khi gọi deleteTask", error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};
