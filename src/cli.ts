import { syntheticAgents, syntheticQueue } from "./data.ts";
import { routeQueue, summarizeRoutes } from "./router.ts";

const decisions = routeQueue(syntheticQueue, syntheticAgents);

console.log(summarizeRoutes(decisions));
