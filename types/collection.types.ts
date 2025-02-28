import { Database } from "./database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Draft = Database["public"]["Tables"]["drafts"]["Row"];
export type Event = Database["public"]["Tables"]["events"]["Row"];
