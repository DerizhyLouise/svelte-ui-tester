import { z } from 'zod';

const sheetSchema = z.object({
	open: z.boolean(),
	data: z.any()
});

export type SheetSchema = z.infer<typeof sheetSchema>;