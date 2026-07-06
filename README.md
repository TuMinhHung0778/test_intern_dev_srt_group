# SRT Group Intern Developer Test - Todo List

Ứng dụng quản lý công việc đơn giản, gồm frontend React và backend Node.js/Express kết nối MongoDB.

## Chức năng

- Hiển thị danh sách công việc.
- Thêm công việc mới.
- Chỉnh sửa nội dung công việc.
- Xóa công việc.
- Đánh dấu hoàn thành/chưa hoàn thành.
- Tìm kiếm theo nội dung công việc.
- Lọc theo trạng thái: tất cả, đang làm, hoàn thành.
- Lọc theo thời gian tạo: hôm nay, tuần này, tháng này, tất cả.
- Phân trang danh sách công việc.
- Giao diện responsive cho desktop và mobile.

## Công nghệ sử dụng

- Frontend: React, Vite, Tailwind CSS, Axios, Lucide React, Sonner.
- Backend: Node.js, Express, Mongoose.
- Database: MongoDB.

## Cấu trúc thư mục

```txt
35.SRT_GROUP_TEST/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Yêu cầu môi trường

- Node.js 18 trở lên.
- npm.
- MongoDB local hoặc MongoDB Atlas.

## Cài đặt

### 1. Cài backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend`:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/srt_todo
NODE_ENV=development
```

### 2. Cài frontend

```bash
cd ../frontend
npm install
```

## Chạy dự án ở môi trường development

Mở terminal thứ nhất để chạy backend:

```bash
cd backend
npm run dev
```

Backend chạy tại:

```txt
http://localhost:5001
```

Mở terminal thứ hai để chạy frontend:

```bash
cd frontend
npm run dev
```

Frontend chạy tại:

```txt
http://localhost:5173
```

## Build frontend

```bash
cd frontend
npm run build
```

## API endpoints

Base URL:

```txt
http://localhost:5001/api
```

| Method | Endpoint              | Mô tả                   |
| ------ | --------------------- | ----------------------- |
| GET    | `/tasks?filter=today` | Lấy danh sách công việc |
| POST   | `/tasks`              | Tạo công việc mới       |
| PUT    | `/tasks/:id`          | Cập nhật công việc      |
| DELETE | `/tasks/:id`          | Xóa công việc           |

Giá trị `filter` hỗ trợ: `today`, `week`, `month`, `all`.

Ví dụ body tạo công việc:

```json
{
  "title": "Hoàn thiện bài test SRT Group"
}
```

Ví dụ body cập nhật trạng thái:

```json
{
  "status": "complete",
  "completedAt": "2026-07-06T12:00:00.000Z"
}
```

## Xử lý dữ liệu không hợp lệ

- Frontend không cho thêm hoặc lưu nhiệm vụ rỗng.
- Backend kiểm tra `title` bắt buộc trước khi tạo/cập nhật.
- Backend trả về `404` khi không tìm thấy nhiệm vụ cần cập nhật hoặc xóa.
- Backend dùng enum cho trạng thái công việc: `active`, `complete`.

## Ghi chú

Trong môi trường development, backend chỉ mở CORS cho frontend tại `http://localhost:5173`.

# test_intern_dev_srt_group
