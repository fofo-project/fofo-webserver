import { initServer } from "./src/initServer.js";
import config from "../config.js";

const app = initServer();

app.listen(config.port, () => {
	console.log(`Proxy server is running on https://localhost:${config.port}`);
});
