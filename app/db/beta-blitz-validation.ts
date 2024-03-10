import z from "zod";

// Define the Zod schema for a single CompletedRoute
const completedRouteSchema = z.object({
  value: z.number(),
  completedTimestamp: z.coerce.date(),
});

const completedRoutesSchema = z.array(completedRouteSchema);

const betaBlitzSchema = z.object({
  id: z.number().int(),
  goal: z.number().min(0).int(),
  completedRoutes: z
    .string()
    .nullable()
    .transform((str) => {
      const arr = str ? JSON.parse(str) : [];
      return completedRoutesSchema.parse(arr);
    }),
  startTimestamp: z.coerce.date(),
  endTimestamp: z.coerce.date().nullable(),
});

type BetaBlitzType = z.infer<typeof betaBlitzSchema>;

const createBetaBlitzValidationSchema = betaBlitzSchema
  .omit({
    id: true,
    completedRoutes: true,
    endTimestamp: true,
  })
  .transform((obj) => ({
    ...obj,
    startTimestamp: obj.startTimestamp.toISOString(),
  }));

const updateBetaBlitzValidationSchema = betaBlitzSchema
  .omit({
    id: true,
    startTimestamp: true,
    completedRoutes: true,
  })
  .merge(z.object({ completedRoutes: completedRoutesSchema }))
  .transform((obj) => ({
    ...obj,
    completedRoutes: obj.completedRoutes
      ? JSON.stringify(obj.completedRoutes)
      : null,
    endTimestamp: obj.endTimestamp?.toISOString() ?? null,
  }));

export {
  betaBlitzSchema,
  BetaBlitzType,
  createBetaBlitzValidationSchema,
  updateBetaBlitzValidationSchema,
};
