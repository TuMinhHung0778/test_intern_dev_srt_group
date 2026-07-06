const Header = () => {
  return (
    <div className="space-y-3 text-center">
      <div className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
        SRT Group Intern Developer Test
      </div>
      <h1 className="text-3xl font-bold text-transparent sm:text-4xl bg-gradient-primary bg-clip-text">
        Todo List
      </h1>

      <p className="max-w-xl mx-auto text-sm leading-6 sm:text-base text-muted-foreground">
        Quản lý công việc hằng ngày với thêm, sửa, xóa, tìm kiếm, lọc trạng thái
        và đánh dấu hoàn thành.
      </p>
    </div>
  );
};

export default Header;
