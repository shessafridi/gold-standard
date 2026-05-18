import type { Server } from "socket.io"
import type { AuthenticatedSocket } from "./socket.auth"

export const registerSocketEvents = (io: Server) => {
  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log("User connected", socket.user)

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })
}
