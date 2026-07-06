import { Circle } from "lucide-react";
import { Card } from "./ui/card";

const TaskEmptyState = ({ filter, searchTerm }) => {
  const hasSearch = Boolean(searchTerm?.trim());

  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {hasSearch
              ? "Không tìm thấy nhiệm vụ phù hợp."
              : filter === "active"
              ? "Không có nhiệm vụ nào đang làm."
              : filter === "completed"
              ? "Chưa có nhiệm vụ nào hoàn thành."
              : "Chưa có nhiệm vụ"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {hasSearch
              ? "Thử nhập từ khóa khác hoặc đổi bộ lọc trạng thái."
              : filter === "all"
              ? "Thêm nhiệm vụ đầu tiên để bắt đầu!"
              : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${
                  filter === "active" ? "đã hoàn thành." : "đang làm."
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default TaskEmptyState;
