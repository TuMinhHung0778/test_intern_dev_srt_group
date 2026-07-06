import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HomePage = () => {
  // save danh sách nhiệm vụ từ backend về - Buffer = dữ liệu thô, cần chờ xử lý.
  const [taskBuffer, setTaskBuffer] = useState([]);

  const [activeTaskCount, setActiveTaskCount] = useState(0); // state để lưu giá trị activeCount
  const [completeTaskCount, setCompleteTaskCount] = useState(0); // state để lưu giá trị completeCount

  const [filter, setFilter] = useState("all"); // state để lưu filter hiện tại
  const [searchTerm, setSearchTerm] = useState("");

  const [dateQuery, setDateQuery] = useState("today");

  const [page, setPage] = useState(1); // luu trang de dieu huong component TaskListPagination
  const [isLoading, setIsLoading] = useState(false);

  // logic
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      // const res = await fetch("http://localhost:5001/api/tasks"); // Thay vì dùng fetch() để call apo thì cài thư viên axios để call api dễ dàng hơn, có cú pháp ngắn gọn, tự động parse json và hỗ trợ nhiều tính năng khác như là setHeader...
      // const data = await res.json();
      // const res = await axios.get("/tasks"); // lib/axios.js
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Không thể tải danh sách nhiệm vụ. Hãy kiểm tra backend và MongoDB.");
    } finally {
      setIsLoading(false);
    }
  }, [dateQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const handleDateQueryChange = (nextDateQuery) => {
    setDateQuery(nextDateQuery);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  // biến lưu danh sách nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task) => {
    const matchesSearch = task.title
      ?.toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    if (!matchesSearch) return false;

    switch (filter) {
      case "active":
        return task.status === "active"; // chỉ giữa lại nhưng task có trạng thái 'active'
      case "completed":
        return task.status === "complete"; // chỉ giữa lại nhưng task có trạng thái 'complete'
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-background">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle 420px at 8% 120px, hsl(204 94% 88% / 0.7), transparent),
        radial-gradient(circle 420px at 92% 180px, hsl(142 76% 86% / 0.7), transparent)
      `,
        }}
      />
      <div className="container relative z-10 px-4 py-8 mx-auto sm:py-10">
        <div className="w-full max-w-3xl p-4 mx-auto space-y-6 sm:p-6">
          {/* Đầu Trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/*Thống kê bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={handleFilterChange}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <div className="relative">
            <Search className="absolute -translate-y-1/2 left-3 top-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm nhiệm vụ..."
              className="h-11 bg-white/80 pl-9 border-border/70"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Danh Sách Nhiệm Vụ */}
          {isLoading ? (
            <div className="py-10 text-center rounded-md bg-white/70 text-muted-foreground shadow-custom-sm">
              Đang tải danh sách nhiệm vụ...
            </div>
          ) : (
            <TaskList
              filteredTasks={visibleTasks}
              filter={filter}
              searchTerm={searchTerm}
              handleTaskChanged={handleTaskChanged}
            />
          )}

          {/* Phân Trang và Lọc Theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={handleDateQueryChange}
            />
          </div>

          {/* Chân Trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
