import { z } from "zod";

export const formSchema = z.object({
    location_id: z.number(),
    location_name: z.string().min(1),
    location_mode: z.string().min(1),
    status: z.string().min(1),
    location_alias: z.string(),
    description: z.string(),
    address: z.string(),
    position_longitude: z.preprocess(
        (position_longitude) =>
            parseFloat(z.string().parse(typeof position_longitude === 'number' ? position_longitude.toString() : position_longitude)),
        z.number().nonnegative()
    ),
    position_latitude: z.preprocess(
        (position_latitude) =>
            parseFloat(z.string().parse(typeof position_latitude === 'number' ? position_latitude.toString() : position_latitude)),
        z.number().nonnegative()
    ),
    position_altitude: z.preprocess(
        (position_altitude) =>
            parseFloat(z.string().parse(typeof position_altitude === 'number' ? position_altitude.toString() : position_altitude)),
        z.number().nonnegative()
    ),
    entity_code: z.string(),
    defunct_ind: z.boolean(),
});

export type FormSchema = typeof formSchema;

export type Location = z.infer<FormSchema>;