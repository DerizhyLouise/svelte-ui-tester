import { z } from 'zod';

const idScheme = z.object({
	name: z.string(),
	value: z.number()
});

const actionScheme = z.object({
	name: z.string(),
	action: z.function()
});

export type idAction = z.infer<typeof idScheme>;
export type DataTableAction = z.infer<typeof actionScheme>;
