import "dotenv/config";
import { Server } from "@/database";

const app = new Server();

// Start app
app.listen();
