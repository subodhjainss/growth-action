import { defineApp } from "convex/server";
import staticHosting from "@convex-dev/static-hosting/convex.config";
import rateLimiter from "@convex-dev/rate-limiter/convex.config.js";
const app = defineApp();
app.use(rateLimiter);
app.use(staticHosting);
export default app;
