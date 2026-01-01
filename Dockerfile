# ----- ขั้นตอนที่ 1: Build Stage -----
FROM oven/bun:1.3 AS builder

# กำหนด Working Directory
WORKDIR /usr/src/app

# Copy และติดตั้ง dependencies
COPY package.json bun.lock ./
# RUN bun install --production --frozen-lockfile
RUN bun install

# Copy ไฟล์ทั้งหมด
COPY . .

# ตั้งค่า environment variables
ENV NODE_ENV=production
ENV BUN_ENV=production

# Build แอป Next.js
RUN bun run build

# ----- ขั้นตอนที่ 2: Production Image -----
FROM oven/bun:1.3-slim AS runtime

WORKDIR /usr/src/app

# Copy ไฟล์จาก Builder Stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/bun.lock* ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Add Permission
RUN chown -R bun:bun /usr/src/app

# ใช้ User `bun` เพื่อความปลอดภัย
USER bun

# ตั้งค่า environment variables
ENV NODE_ENV=production
ENV BUN_ENV=production

# เปิดพอร์ต
EXPOSE 3000

# รันแอป
CMD ["bun", "run", "start"]