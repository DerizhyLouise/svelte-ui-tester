import { z } from "zod";

export const formSchema = z.object({
    location_id: z.number(),
    location_name: z.string().min(1),
    location_mode: z.string().min(1),
    status: z.string().min(1),
    location_alias: z.string(),
    description: z.string(),
    address: z.string(),
    position_longitude: z.number(),
    position_latitude: z.number(),
    position_altitude: z.number(),
    entity_code: z.string(),
    defunct_ind: z.boolean(),
});

export type FormSchema = typeof formSchema;