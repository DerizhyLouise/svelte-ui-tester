import { z } from "zod";

const statusEnum = [
    { label: "Active", value: "active" },
    { label: "Unactive", value: "unactive" }
] as const;

type Status = (typeof statusEnum)[number]["value"];

export const locationSchema = z.object({
    location_id: z.number(),
    location_name: z.string().min(1),
    location_mode: z.string().min(1),
    status: z.enum(
        statusEnum.map((f) => f.value) as [Status, ...Status[]]
    ),
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

export type Location = z.infer<typeof locationSchema>;