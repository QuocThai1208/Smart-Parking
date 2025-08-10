# Hệ thống giữ xe tự động

## Giới thiệu

Đề tài **Hệ thống giữ xe tự động** nhằm xây dựng một giải pháp quản lý bãi giữ xe thông minh, tự động nhận diện biển số xe, tự động thu phí qua cổng thanh toán điện tử, giúp giảm thiểu thời gian chờ đợi và sai sót trong quản lý truyền thống.
Hệ thống sử dụng công nghệ nhận diện biển số xe (YOLO), quản lý dữ liệu người gửi xe qua ứng dụng mobile.
Mục tiêu của hệ thống là tự động hóa toàn bộ quay trình gửi  và nhận xe , đồng thời đảm bảo tính chính xác và minh bạch trong việc tính phí và thanh toán.

## Kiến trúc hệ thống
Hệ thống bao gồm các thành phần chính:
    - Model nhận diện biển số xe: Sử dụng mô hình YOLOv8 để phát hiện và nhận diện biển số khi phương tiện đi vào hoặc ra khỏi bãi.
    - Backend: Xây dựng trên Django , cung cấp API RESTful để quản lý dữ liệu và xử lý thanh toán.
    - Cơ sở dữ liệu: Dùng MySQL để lưu dữ liệu của hệ thống.
    - Ứng dụng di động: Sử dụng React Native để xây dựng ứng dụng di động, cung cấp giao diện xe người dùng/quản lý xem nhật ký gửi xe, thông tin ví, xem danh sách phương tiện, xem bảng giá giữ xe, nhật ký giao dịch, xem báo cáo thống kê (dành cho quản lý).

## Tính năng nổi bật
  - *Nhận diện biển số xe tự động*: Dùng YOLOv8 để nhận diện và đọc ký tự biển số tự động khi xe vào/ra ở bãi, qua đó xác định được biển số xe nhanh chống giảm sự can thiệp của con người.
  - *Quản lý lượt gửi xe*: Hệ thống lưu lại lượt gửi xe của người dùng, thời gian ra/vào , tính phí chính xác dựa trên thời gian gửi xe.
  - *Phân loại phương tiện*: Dùng YOLOv8 để phân loại phương tiện khi người dùng đăng ký phượng tiện, nhằm tăng tính chính xác để áp dụng phí trên các phương tiện.
  - *Thanh toán tự động*: Thanh toán tự động thông qua ví thanh toán khi người dùng lấy.
  - Và các chức năng cơ bản khác.

## Công nghệ sử dụng
- Chứng thực người dùng: Oauth2.
- Cơ sở dữ liệu: MySQL.
- Backend: Django.
- Frontend: React Native.
- Mô hình nhận diện: YOLOv8

## Mục tiêu phát triển
- Tăng cường độ chính xác và tốc độ nhận diện biển số xe
- Mở rộng hỗ trợ đa dạng loại phương tiện (ô tô, xe máy, xe đạp điện)
- Nâng cao trải nghiệm người dùng với giao diện thân thiện, dễ sử dụng
- Tích hợp thêm các phương thức thanh.
- Phát triển tính năng phát hiện biển số không đúng với phương tiện, giúp tránh được tình huống biển số của phương tiện này sử dụng cho phương tiện khác.




---
