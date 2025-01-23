import { equipmentSchema, maintenanceRecordSchema } from "./schemas";
import { z } from "zod";

export type Equipment = z.infer<typeof equipmentSchema>;
export type MaintenanceRecord = z.infer<typeof maintenanceRecordSchema>;
