import 'node:os' // For some reason, this import is required to resolve WebSocketServer
import { WebSocketServer } from 'ws';

const port = process.env.PORT || 3000
const wss = new WebSocketServer({ port });

console.log(`Server running at http://localhost:${port}/`)

wss.on('connection', function connection(ws) {

  ws.on('error', console.error);
  ws.on('message', (message) => {
    const { id, command, payload } = JSON.parse(message)
    
    const response = { id, command, response: true }
    if (command === 'platform') response.payload = process.platform
    
    else {
      response.error = `Unknown command: ${command}`
      delete response.payload
    }

    ws.send(JSON.stringify(response))

  });
});