import { resolveCorsOrigins } from "@/shared/utils/cors-origins"
import type http from "node:http"
import type { Http2Server } from "node:http2"
import { Server } from "socket.io"

export const createSocketServer = (httpServer: http.Server | Http2Server) => {
  return new Server(httpServer, {
    cors: {
      origin: resolveCorsOrigins(),
      credentials: true,
    },
  })
}
