import z from "zod";

export const betaBlitzSchema = z.object({
  id: z.number().int(),
  goal: z.number().min(0).int(),
  completedRoutes: z
    .array(z.object({ value: z.number(), completedTimestamp: z.coerce.date() }))
    .nullable(),
  startTimestamp: z.coerce.date(),
  endTimestamp: z.coerce.date().nullable(),
});

export const createBetaBlitzValidationSchema = betaBlitzSchema.omit({
  id: true,
  completedRoutes: true,
  endTimestamp: true,
});

export const updateBetaBlitzValidationSchema = betaBlitzSchema
  .omit({
    id: true,
  })
  .partial();

export type BetaBlitzType = z.infer<typeof betaBlitzSchema>;
