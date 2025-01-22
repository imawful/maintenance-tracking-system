// Generated by ts-to-zod
// minor touches to schemas to fit criteria.
// schemas constructed with form validation in mind.
import { z } from "zod";

const alphaNumeric : RegExp = /^[a-z0-9]+$/i;
const requiredMsg = "This field is required.";

//min(1) used to invalidate empty aka for REQUIRED.
const equipmentSchema = z.object({
    id: z.string(),
    name: z.string().min(3, {message: "Name must be greater than 3 characters."}),
    location: z.string().min(1, {message: requiredMsg}),
    department: z.enum([
        "Machining",
        "Assembly",
        "Packaging",
        "Shipping",
    ], {message: "Please select a department"}),
    model: z.string().min(1, {message: requiredMsg}),
    serialNumber: z.string().regex(alphaNumeric, {message: "Serial number must be alphanumeric"}),
    installDate: z.coerce.date().max(new Date(), {message: "Must be a past date."}),
    status: z.enum([
        "Operational",
        "Down",
        "Maintenance",
        "Retired",
    ], {message: "Please select a status."}),
});

const maintenanceRecordSchema = z.object({
    id: z.string(),
    equipmentId: z.string(),
    date: z.coerce.date().max(new Date()),
    type: z.enum([
        "Preventive",
        "Repair",
        "Emergency",
    ], {message: "Please choose a maintenance type."}),
    technician: z.string().min(2, {message: "Technician name is too short."}),
    hoursSpent: z.number()
                 .min(0, {message: "Hours cannot be less than 0"})
                 .max(24, {message: "Hours cannot be greater than 24"}),
    description: z.string().min(10, {message: "Enter a more descriptive description."}),
    partsReplaced: z.array(z.string()).optional(),
    priority: z.enum(["Low", "Medium", "High"], {message: "Please select a priority."}),
    completionStatus: z.enum([
        "Complete",
        "Incomplete",
        "Pending Parts",
    ]),
});

export { equipmentSchema, maintenanceRecordSchema };
