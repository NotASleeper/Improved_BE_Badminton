# 🏸 Badminton Gear Backend API

Đây là hệ thống **Backend RESTful API** phục vụ cho website bán đồ cầu lông, được xây dựng trên nền tảng **Node.js** và **Express**. Hệ thống cung cấp đầy đủ các tính năng thương mại điện tử, tích hợp trí tuệ nhân tạo (AI) để tư vấn khách hàng và hỗ trợ đa ngôn ngữ.

## 🌟 Tính năng nổi bật

### 🤖 AI & Tự động hóa
- **Chatbot thông minh (Gemini 2.5 Flash)**:
  - Sử dụng mô hình `gemini-2.5-flash` và `text-embedding-004` của Google.
  - Tích hợp **LangChain** và **HNSWLib** (Vector Store) để tìm kiếm ngữ nghĩa cực nhanh.
  - **Tự động nhận diện ngôn ngữ**: Trả lời tiếng Việt hoặc tiếng Anh dựa trên câu hỏi của khách hàng.
  - Có bộ nhớ lịch sử chat (Context-aware).
- **Hệ thống dịch thuật sản phẩm (Pro Translation)**:
  - Tự động dịch thông tin sản phẩm sang nhiều ngôn ngữ khác nhau.
  - API quản lý bản dịch chuyên nghiệp.

### 💬 Giao tiếp Real-time
- **Socket.io Integration**:
  - Chat trực tuyến thời gian thực giữa Khách hàng và Admin.
  - Phân chia phòng chat (Room) theo User ID.
  - Admin có thể tham gia vào các phòng chat cụ thể để hỗ trợ.

### 🛒 Thương mại điện tử
- **Quản lý sản phẩm & Danh mục**: CRUD sản phẩm, hình ảnh, kho hàng (GRN).
- **Giỏ hàng & Đơn hàng**: Quy trình đặt hàng, quản lý trạng thái đơn hàng.
- **Thanh toán trực tuyến**: Tích hợp cổng thanh toán **VNPay** và **PayPal**.
- **Khuyến mãi (Promotions)**: Quản lý mã giảm giá, chương trình Flash Sale.
- **Đánh giá (Reviews)**: Cho phép người dùng đánh giá sản phẩm.

### 🔐 Bảo mật & Xác thực
- Xác thực người dùng bằng **JWT (JSON Web Token)**.
- Phân quyền (RBAC): Admin, Staff, User.

### 🌍 Đa ngôn ngữ & Dịch thuật (AI-Powered)
Hệ thống không chỉ hỗ trợ đa ngôn ngữ tĩnh mà còn tích hợp AI để tự động hóa quy trình bản địa hóa nội dung:
- **Dịch thuật tự động với Google Gemini 2.5 Flash**:
  - Tích hợp `translateJSON` service giúp dịch nguyên vẹn cấu trúc dữ liệu phức tạp (Object/Array) mà không làm hỏng định dạng.
  - Tự động dịch thông tin sản phẩm (Tên, Mô tả) từ ngôn ngữ gốc sang ngôn ngữ đích chỉ với một API call.
- **Quản lý nội dung đa ngữ (Pro Translation)**:
  - Lưu trữ riêng biệt các bản dịch của sản phẩm theo mã ngôn ngữ (`languagecode`), giúp mở rộng thị trường dễ dàng.

### 🔔 Hệ thống Thông báo Thông minh
Hệ thống thông báo được thiết kế theo hướng "Localization-first" và cá nhân hóa:
- **Thông báo đa ngôn ngữ (i18n)**:
  - Sử dụng cơ chế `messagekey` kết hợp với tham số động (Dynamic Params) như tên người dùng, mã giảm giá. Nội dung thông báo sẽ được dịch tự động sang ngôn ngữ người dùng đang sử dụng khi truy xuất.
- **Targeting Logic (Phân loại đối tượng)**:
  - **Cá nhân:** Gửi thông báo đến từng user cụ thể.
- **Quản lý trạng thái**: Theo dõi trạng thái đã đọc/chưa đọc (`isread`) và đếm số lượng thông báo mới realtime.
---

## 🛠️ Công nghệ sử dụng

| Lĩnh vực | Công nghệ |
| :--- | :--- |
| **Core** | Node.js, Express.js |
| **Database** | MySQL, Sequelize ORM |
| **Real-time** | Socket.io |
| **AI & LLM** | LangChain, Google Gemini AI (Google GenAI SDK) |
| **Vector DB** | HNSWLib (In-memory vector store) |
| **Payment** | VNPay, PayPal SDK |
| **Upload** | Multer, Cloudinary |
| **Mail** | Nodemailer |

---

## 🚀 Hướng dẫn cài đặt & Chạy dự án

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 18+ (Khuyên dùng bản LTS mới nhất).
- **MySQL**: Cơ sở dữ liệu đã được cài đặt và đang chạy.
- **Yarn**: Trình quản lý gói (`npm install -g yarn`).

### 2. Cài đặt

**Bước 1:** Clone dự án
```bash
git clone https://github.com/NotASleeper/Improved_BE_Badminton.git
cd BE_BadmintonWeb
```
**Bước 2:** Cài đặt các thư viện (dependencies)
```bash
yarn install
```
**Bước 3:** Cấu hình database
- Mở file config/config.json và cập nhật thông tin đăng nhập MySQL của bạn (username, password, database name).
- Tạo database rỗng trong MySQL Workbench trùng tên với config.
**Bước 4:** Chạy Migrations & Seeding (Tạo bảng & Dữ liệu mẫu)
```bash
# Tạo bảng
npx sequelize db:migrate

# Thêm dữ liệu mẫu (Roles, Users, Products...)
npx sequelize db:seed:all
```
**Bước 5:**Cấu hình biến môi trường Tạo file .env tại thư mục gốc và điền các thông tin sau (Cập nhật key của bạn):
```bash
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_app_password

VNPAY_SECRET=your_vnpay_secret
VNPAY_TMN_CODE=your_vnpay_tmncode

CHATBOT_API_KEY=your_google_gemini_api_key_1
GOOGLE_API_KEY=your_google_gemini_api_key_2

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
```
### 3. Chạy server
```bash
yarn dev
```
Server sẽ khởi chạy tại: http://localhost:3000

---

### 📂 Cấu trúc API (Endpoints chính)
Tất cả API đều có prefix /api/v1.

### **1. Auth & Users**
- `POST` **/users**: Đăng ký tài khoản.
- `POST` **/users/login**: Đăng nhập (Trả về JWT).
- `GET` **/users/:userid**: Lấy thông tin người dùng hiện tại (Yêu cầu Header `token`).

### **2. Products (Sản phẩm)**
- `GET` **/products**: Lấy tất cả sản phẩm (Có phân trang).
- `GET` **/products/:id**: Lấy chi tiết sản phẩm theo ID.
- `GET` **/best-sale/top5**: Lấy danh sách 5 sản phẩm được bán chạy nhất trong tháng.

### **3. Chatbot & Translation (AI Features)**
- `POST` **/users/chatbot**: Chat với Bot Gemini AI.
- `GET` **/chats**: Xem lại lịch sử tin nhắn.
- `POST` **/protranslations/translate**: Dùng AI dịch thông tin sản phẩm hỗ trợ Admin.

### **4. Orders & Cart**
- `GET` **/carts/:userid**: Xem giỏ hàng.
- `POST` **/carts**: Thêm vào giỏ hàng.
- `POST` **/carts/checkout**: Checkout (Tạo đơn hàng).

---
## 📂 Tài nguyên liên quan
Bạn có thể tham khảo phần **Front-end** của hệ thống và **tài liệu mô tả chi tiết** được thực hiện cùng lúc trong quá trình phát triển dự án để có thể chạy được dự án trọn vẹn và có cái nhìn tổng quan nhất.
- 🔗 **Front-end GitHub Repo:** [https://github.com/PhuongHo105/BadmintonGear.git](https://github.com/PhuongHo105/BadmintonGear.git)
- 📄 **Tài liệu mô tả dự án:** [Link Document](https://github.com/NotASleeper/BA_BadmintonWebsite.git)
