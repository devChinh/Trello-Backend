import 'dotenv/config' 

// dotenv là để sử dung file env cấu hình tham số môi trường

export const env = {
    MONGODB_URI : process.env.MONGODB_URI,
    PORT : process.env.PORT,
    DATABASE_NAME : process.env.DATABASE_NAME,
}