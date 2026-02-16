# Node.js MVC CRUD với DynamoDB Local

Dự án CRUD đơn giản sử dụng Node.js, Express, EJS và DynamoDB Local (chạy trong Docker).

## 📋 Yêu cầu

- Node.js (v14 trở lên)
- Docker và Docker Compose
- npm hoặc yarn

## 🚀 Cài đặt

### 1. Clone và cài đặt dependencies

```bash
cd lab05/node_mvc_dynamodb_local
npm install
```

### 2. Cấu hình môi trường

File `.env` đã được tạo sẵn với cấu hình cho DynamoDB Local:

```env
PORT=3000
NODE_ENV=development
DYNAMODB_ENDPOINT=http://localhost:8000
DYNAMODB_REGION=us-west-2
DYNAMODB_TABLE_NAME=Products
AWS_ACCESS_KEY_ID=local
AWS_SECRET_ACCESS_KEY=local
```

### 3. Khởi động DynamoDB Local

```bash
npm run docker:up
```

Hoặc:

```bash
docker-compose up -d
```

Sau khi khởi động, bạn có thể truy cập:
- **DynamoDB Local**: http://localhost:8000
- **DynamoDB Admin GUI**: http://localhost:8001

### 4. Khởi tạo Database

Tạo table `Products` trong DynamoDB Local:

```bash
npm run init-db
```

### 5. Chạy ứng dụng

```bash
npm start
```

Hoặc chạy với nodemon (auto-reload):

```bash
npm run dev
```

Truy cập ứng dụng tại: **http://localhost:3000**

## 📁 Cấu trúc dự án

```
lab05/node_mvc_dynamodb_local/
├── src/
│   ├── config/
│   │   └── dynamodb.js          # Cấu hình DynamoDB client
│   ├── controllers/
│   │   └── productController.js # Controller xử lý logic
│   ├── models/
│   │   └── productModel.js      # Model tương tác với DynamoDB
│   ├── routes/
│   │   ├── index.js             # Route trang chủ
│   │   └── productRoute.js      # Routes cho products
│   ├── views/
│   │   ├── products/
│   │   │   ├── list.ejs         # Danh sách sản phẩm
│   │   │   ├── add.ejs          # Form thêm sản phẩm
│   │   │   └── edit.ejs         # Form sửa sản phẩm
│   │   └── error.ejs            # Trang lỗi
│   └── server.js                # Entry point
├── scripts/
│   └── init-db.js               # Script khởi tạo database
├── docker-compose.yml           # Docker compose config
├── .env                         # Environment variables
├── .env.example                 # Environment template
└── package.json
```

## 🎯 Chức năng

- ✅ **CREATE**: Thêm sản phẩm mới
- ✅ **READ**: Xem danh sách sản phẩm
- ✅ **UPDATE**: Cập nhật thông tin sản phẩm
- ✅ **DELETE**: Xóa sản phẩm

## 📊 Schema sản phẩm

```javascript
{
  productId: String,    // UUID - Partition Key
  name: String,         // Tên sản phẩm
  price: Number,        // Giá sản phẩm
  quantity: Number,     // Số lượng tồn kho
  createdAt: String,    // Thời gian tạo (ISO 8601)
  updatedAt: String     // Thời gian cập nhật (ISO 8601)
}
```

## 🛠️ NPM Scripts

- `npm start` - Chạy ứng dụng
- `npm run dev` - Chạy với nodemon (auto-reload)
- `npm run init-db` - Khởi tạo table trong DynamoDB Local
- `npm run docker:up` - Khởi động Docker containers
- `npm run docker:down` - Dừng Docker containers

## 🐳 Docker Services

- **dynamodb-local**: DynamoDB Local (port 8000)
- **dynamodb-admin**: GUI quản lý DynamoDB (port 8001)

## 🔧 Troubleshooting

### Lỗi kết nối DynamoDB

Đảm bảo Docker containers đang chạy:

```bash
docker ps
```

Nếu không thấy containers, khởi động lại:

```bash
npm run docker:up
```

### Lỗi "Table not found"

Chạy lại script khởi tạo database:

```bash
npm run init-db
```

### Port đã được sử dụng

Thay đổi port trong file `.env`:

```env
PORT=3001
```

## 📝 License

ISC

