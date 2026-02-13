import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const campus = await prisma.organization.upsert({
    where: { slug: "campus-demo" },
    update: {},
    create: {
      type: "CAMPUS",
      name: "Demo University",
      slug: "campus-demo",
      description: "Sample campus for move-out donations",
      address: "123 College Ave",
      contactEmail: "donations@demo.edu",
    },
  });

  const nonprofit = await prisma.organization.upsert({
    where: { slug: "nonprofit-demo" },
    update: {},
    create: {
      type: "NONPROFIT",
      name: "Community Family Services",
      slug: "nonprofit-demo",
      description: "Serving families in crisis",
      address: "456 Hope St",
      contactEmail: "intake@communityfamily.org",
    },
  });

  await prisma.user.upsert({
    where: { email: "donor@moveouthelpout.org" },
    update: {},
    create: {
      email: "donor@moveouthelpout.org",
      name: "Campus Donor",
      role: "DONOR",
      organizationId: campus.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "nonprofit@moveouthelpout.org" },
    update: {},
    create: {
      email: "nonprofit@moveouthelpout.org",
      name: "Nonprofit User",
      role: "NONPROFIT",
      organizationId: nonprofit.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "coordinator@moveouthelpout.org" },
    update: {},
    create: {
      email: "coordinator@moveouthelpout.org",
      name: "Logistics Coordinator",
      role: "COORDINATOR",
    },
  });

  const items = [
    { title: "Desk lamp", category: "Electronics", quantity: 2 },
    { title: "Twin bedding set", category: "Bedding & linens", quantity: 1 },
    { title: "Kitchen plates and bowls", category: "Kitchen & dining", quantity: 4 },
    { title: "Winter coat", category: "Clothing & shoes", quantity: 1 },
    { title: "Storage bins", category: "Other", quantity: 3 },
  ];

  for (const item of items) {
    await prisma.inventoryItem.create({
      data: {
        donorId: campus.id,
        title: item.title,
        category: item.category,
        quantity: item.quantity,
        status: "LISTED",
      },
    });
  }

  const itemsCreated = await prisma.inventoryItem.findMany({
    where: { donorId: campus.id },
    take: 2,
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const endWeek = new Date(nextWeek);
  endWeek.setHours(18, 0, 0, 0);
  nextWeek.setHours(9, 0, 0, 0);

  const existingPickup = await prisma.pickupWindow.findFirst({
    where: { donorId: campus.id },
  });
  if (!existingPickup) {
    await prisma.pickupWindow.create({
      data: {
        donorId: campus.id,
        startsAt: nextWeek,
        endsAt: endWeek,
        status: "SCHEDULED",
        notes: "Main campus move-out weekend",
      },
    });
  }

  if (itemsCreated[0] && nonprofit) {
    await prisma.claim.upsert({
      where: {
        nonprofitId_itemId: {
          nonprofitId: nonprofit.id,
          itemId: itemsCreated[0].id,
        },
      },
      update: {},
      create: {
        nonprofitId: nonprofit.id,
        itemId: itemsCreated[0].id,
        quantity: 1,
        status: "CLAIMED",
      },
    });
  }

  console.log("Seed complete. Use donor@moveouthelpout.org / nonprofit@moveouthelpout.org / coordinator@moveouthelpout.org with password 'demo'.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
