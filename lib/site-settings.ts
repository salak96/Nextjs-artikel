import { prisma } from "./prisma";

export type LayoutType = "blog" | "magazine";

const defaults: Record<string, string> = {
  layout: "blog",
};

export async function getSiteSetting(key: string): Promise<string> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    return setting?.value ?? defaults[key] ?? "";
  } catch {
    return defaults[key] ?? "";
  }
}

export async function getLayout(): Promise<LayoutType> {
  const val = await getSiteSetting("layout");
  return val === "magazine" ? "magazine" : "blog";
}

export async function setSiteSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
