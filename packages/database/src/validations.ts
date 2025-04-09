import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import * as schema from "./schema/auth.schema";

export const insertOrganizationSchema = createInsertSchema(schema.organization);
export const selectOrganizationSchema = createSelectSchema(schema.organization);
export const updateOrganizationSchema = selectOrganizationSchema.partial();
