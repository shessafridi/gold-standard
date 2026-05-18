import env from "@/env"
import jwt from "jsonwebtoken"
import type { Server, Socket } from "socket.io"

export interface AuthenticatedSocket extends Socket {
  user?: { email: string }
}

export const socketAuthMiddleware = (io: Server) => {
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.["token"]

    if (!token) return next(new Error("Token required"))

    let userInfo: {
      email: string
    } | null = null
    try {
      const decoded = jwt.verify(token, env.AUTH_SECRET) as {
        email: string
      }
      userInfo = {
        email: decoded.email,
      }
    } catch {
      return next(new Error("Failed to parse token"))
    }

    socket.user = userInfo
    next()
  })
}
