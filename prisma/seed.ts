/* Seeds the database with the default content and the first admin account.
 * Safe to run more than once: existing rows are left untouched. */
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { defaultCurricula, defaultFaqs, defaultServices, defaultSettings, sampleReviews } from "../src/lib/defaults";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "";
  const name = process.env.ADMIN_NAME || "Admin";
  if (!email || password.length < 10) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (min 10 characters) in .env before seeding.");
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    await prisma.adminUser.create({ data: { email, name, passwordHash: await bcrypt.hash(password, 12) } });
    console.log(`✓ Admin created: ${email}`);
  } else {
    console.log(`• Admin already exists: ${email} (password unchanged)`);
  }

  for (const c of defaultCurricula) {
    const { examStructure, ...rest } = c;
    await prisma.curriculum.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...rest, examStructure: examStructure ?? Prisma.JsonNull },
    });
  }
  console.log(`✓ ${defaultCurricula.length} curricula`);

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: defaultServices });
    console.log(`✓ ${defaultServices.length} services`);
  }
  if ((await prisma.faq.count()) === 0) {
    await prisma.faq.createMany({ data: defaultFaqs });
    console.log(`✓ ${defaultFaqs.length} FAQs`);
  }
  if ((await prisma.review.count()) === 0) {
    await prisma.review.createMany({ data: sampleReviews.map((r) => ({ ...r, approved: false })) });
    console.log("✓ 1 sample review (pending, edit or delete it in the admin panel)");
  }
  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log("✓ site settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
