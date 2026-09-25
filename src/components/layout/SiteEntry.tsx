"use client";

import { useEffect } from "react";
import { markSiteEntered } from "@/lib/site-entry";

/** Marca que a primeira página da visita já hidratou (ver lib/site-entry.ts). */
export function SiteEntry() {
  useEffect(() => markSiteEntered(), []);
  return null;
}
