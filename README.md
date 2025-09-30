# Hệ Thống Quan Trắc Môi Trường Nước IoT

Đây là một ứng dụng web dashboard hiện đại để theo dõi và phân tích dữ liệu quan trắc môi trường nước theo thời gian thực từ các cảm biến IoT.

## Tính năng chính

### 1. Bảng điều khiển (Dashboard)
<img width="960" height="464" alt="8" src="https://github.com/user-attachments/assets/68472701-7ac6-45a0-835b-eaf872c1d4b0" />

- **Theo dõi thời gian thực:** Cung cấp cái nhìn tổng quan và nhanh chóng về chất lượng nước tại các địa điểm khác nhau.
- **Chọn trạm quan trắc:** Dễ dàng chuyển đổi giữa các trạm cảm biến để xem dữ liệu chi tiết.
- **Thẻ chỉ số trực quan:** Hiển thị các thông số quan trọng như pH, nhiệt độ, độ đục, và oxy hòa tan (DO) cùng với trạng thái (Tốt, Trung bình, Kém).
- **Cảnh báo tức thì:** Liệt kê các cảnh báo gần đây khi các chỉ số vượt ngưỡng an toàn, giúp người dùng nhanh chóng xác định các vấn đề tiềm ẩn.

### 2. Lịch sử Dữ liệu (Data History)
<img width="947" height="472" alt="9" src="https://github.com/user-attachments/assets/3321cdca-3e01-445d-a667-4fe9224ebad5" />

- **Biểu đồ tương tác:** Xem lại dữ liệu lịch sử của từng chỉ số trong 24 giờ qua dưới dạng biểu đồ đường.
- **Phân tích xu hướng:** Giúp người dùng dễ dàng nhận biết xu hướng thay đổi chất lượng nước theo thời gian, hỗ trợ việc đưa ra quyết định và dự báo.
- **Lọc theo trạm:** Lựa chọn trạm cụ thể để phân tích sâu hơn về lịch sử dữ liệu của trạm đó.

### 3. Bản đồ Trạm (Sensor Map)
<img width="959" height="466" alt="11" src="https://github.com/user-attachments/assets/e58c57d4-b8ab-4734-920e-71d2e65d820c" />

- **Trực quan hóa vị trí:** Hiển thị tất cả các trạm cảm biến trên một bản đồ tương tác.
- **Mã màu trạng thái:** Mỗi trạm được đánh dấu bằng màu sắc tương ứng với chất lượng nước hiện tại, giúp nhận diện nhanh các khu vực đang gặp vấn đề.
- **Thông tin chi tiết:** Nhấp vào một trạm trên bản đồ để xem thông tin tóm tắt về các chỉ số mới nhất.

### 4. Trợ lý AI (AI Assistant)
<img width="956" height="463" alt="10" src="https://github.com/user-attachments/assets/9351077d-4ca2-4857-b5ef-5d94fefb8ffe" />

- **Phân tích dữ liệu thông minh:** Tích hợp trợ lý AI sử dụng mô hình ngôn ngữ lớn để trả lời các câu hỏi của người dùng về dữ liệu quan trắc.
- **Hỏi đáp bằng ngôn ngữ tự nhiên:** Người dùng có thể đặt câu hỏi như "Tình hình chất lượng nước ở Sông Tô Lịch thế nào?" hoặc "So sánh độ pH giữa Hồ Tây và Hồ Hoàn Kiếm".
- **Giải thích chuyên sâu:** AI không chỉ cung cấp dữ liệu mà còn giải thích ý nghĩa của các chỉ số và đưa ra nhận định tổng quan.

## Công nghệ sử dụng

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **Thư viện biểu đồ:** Recharts
-   **Tích hợp AI:** Google Gemini API

## Cách sử dụng

1.  **Điều hướng:** Sử dụng thanh menu bên trái để chuyển đổi giữa các màn hình: Bảng điều khiển, Lịch sử Dữ liệu, Bản đồ Trạm, và Trợ lý AI.
2.  **Tương tác:**
    -   Trên **Bảng điều khiển** và **Lịch sử Dữ liệu**, sử dụng menu thả xuống để chọn trạm bạn muốn xem.
    -   Trên **Bản đồ**, nhấp vào các điểm đánh dấu để xem thông tin chi tiết.
    -   Trong **Trợ lý AI**, nhập câu hỏi của bạn vào ô chat và nhấn "Gửi" để nhận phân tích.
