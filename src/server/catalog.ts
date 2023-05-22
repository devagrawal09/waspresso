import { Beverage } from "@wasp/entities";
import { Catalog } from "@wasp/queries/types";

export const getCatalog: Catalog<never, Beverage[]> = async (args, context) => {
  return context.entities.Beverage.findMany();
};
