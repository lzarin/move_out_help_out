// Role stored as string in DB (SQLite has no enums)
export type Role = "DONOR" | "NONPROFIT" | "COORDINATOR";

export const ROLES: Record<Role, { label: string; description: string }> = {
  DONOR: {
    label: "Donor",
    description: "Campus or student posting surplus items",
  },
  NONPROFIT: {
    label: "Nonprofit",
    description: "Organization serving families in crisis",
  },
  COORDINATOR: {
    label: "Volunteer",
    description: "Coordinates donors and nonprofits; manages pickup times and locations",
  },
};

export const INVENTORY_CATEGORIES = [
  "Furniture",
  "Bedding & linens",
  "Kitchen & dining",
  "Electronics",
  "Clothing & shoes",
  "School supplies",
  "Toiletries & personal care",
  "Other",
] as const;

export type InventoryCategory = (typeof INVENTORY_CATEGORIES)[number];

/** Areas for national rollout — donors and nonprofits operate within an area. */
export const AREAS = [
  "Bay Area, CA",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "New York Metro",
  "Seattle, WA",
  "Washington, DC",
  "Other",
] as const;

export type Area = (typeof AREAS)[number];
