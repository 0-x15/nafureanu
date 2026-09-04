/*
 * PUBLIC DEMO MATCHER — NOT THE PRODUCTION ALGORITHM.
 *
 * A transparent, deliberately simple compatibility check for the public
 * demo: area, price and type/kind are the main criteria; bedrooms and
 * surface are additional, visible criteria. No scores, no weights, no
 * thresholds from any real system.
 */

export const CRITERIA = ["zone", "price", "type", "bedrooms", "surface"];
const MAIN = new Set(["zone", "price", "type"]);

export function evaluate(demand, property) {
  const checks = {
    zone: demand.zone === property.zone,
    price: property.price <= demand.maxBudget,
    type: demand.type === property.type && demand.kind === property.kind,
    bedrooms: property.bedrooms >= demand.minBedrooms,
    surface: property.surface >= demand.minSurface,
  };
  const criteria = CRITERIA.map((key) => ({ key, ok: checks[key], main: MAIN.has(key) }));
  const compatible = criteria.filter((c) => c.main).every((c) => c.ok);
  return { compatible, criteria };
}

const marketable = (p) => p.status === "active" || p.status === "reserved";
const openDemand = (d) => d.status !== "won";

/** Demand → compatible properties (main criteria met), cheapest first. */
export function propertiesForDemand(demand, properties) {
  return properties
    .filter(marketable)
    .map((property) => ({ property, ...evaluate(demand, property) }))
    .filter((r) => r.compatible)
    .sort((a, b) => a.property.price - b.property.price);
}

/** Property → interested demand (main criteria met). */
export function demandsForProperty(property, demands) {
  return demands
    .filter(openDemand)
    .map((demand) => ({ demand, ...evaluate(demand, property) }))
    .filter((r) => r.compatible)
    .sort((a, b) => b.demand.maxBudget - a.demand.maxBudget);
}
