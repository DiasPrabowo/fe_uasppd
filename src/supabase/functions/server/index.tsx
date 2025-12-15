import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-201dba08/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all predictions for a user
app.get("/make-server-201dba08/predictions/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    console.log(`[GET] Fetching predictions for user: ${userId}`);
    const predictions = await kv.getByPrefix(`predictions:${userId}:`);
    console.log(`[GET] Found ${predictions?.length || 0} predictions for user: ${userId}`);
    return c.json({ predictions: predictions || [] });
  } catch (error) {
    console.log("Error fetching predictions:", error);
    return c.json({ error: "Failed to fetch predictions" }, 500);
  }
});

// Save a prediction
app.post("/make-server-201dba08/predictions/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const prediction = await c.req.json();
    const key = `predictions:${userId}:${prediction.id}`;
    console.log(`[POST] Saving prediction with key: ${key}`);
    console.log(`[POST] Prediction data:`, prediction);
    await kv.set(key, prediction);
    console.log(`[POST] Successfully saved prediction to Supabase KV store`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error saving prediction:", error);
    return c.json({ error: "Failed to save prediction" }, 500);
  }
});

// Delete all predictions for a user
app.delete("/make-server-201dba08/predictions/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    console.log(`[DELETE] Clearing predictions for user: ${userId}`);
    const predictions = await kv.getByPrefix(`predictions:${userId}:`);
    const keys = predictions.map((p: any) => `predictions:${userId}:${p.id}`);
    console.log(`[DELETE] Deleting ${keys.length} predictions`);
    if (keys.length > 0) {
      await kv.mdel(keys);
    }
    console.log(`[DELETE] Successfully cleared predictions from Supabase`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting predictions:", error);
    return c.json({ error: "Failed to delete predictions" }, 500);
  }
});

// Get user profile
app.get("/make-server-201dba08/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    console.log(`[GET] Fetching profile for user: ${userId}`);
    const profile = await kv.get(`profile:${userId}`);
    console.log(`[GET] Profile found:`, profile ? 'Yes' : 'No');
    return c.json({ profile });
  } catch (error) {
    console.log("Error fetching profile:", error);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
});

// Update user profile
app.post("/make-server-201dba08/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const profile = await c.req.json();
    console.log(`[POST] Updating profile for user: ${userId}`);
    console.log(`[POST] Profile data:`, profile);
    await kv.set(`profile:${userId}`, profile);
    console.log(`[POST] Successfully updated profile in Supabase`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error updating profile:", error);
    return c.json({ error: "Failed to update profile" }, 500);
  }
});

Deno.serve(app.fetch);