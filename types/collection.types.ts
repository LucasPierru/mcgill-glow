import { Database } from "./database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Profile = Database["public"]["Tables"]["admins"]["Row"];
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type Member = Database["public"]["Tables"]["members"]["Row"];
