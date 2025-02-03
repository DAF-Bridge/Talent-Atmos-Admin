"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on the server-side and first render on the client
  }

  // Remove the base path ('/th' & '/en') and split the remaining path
  const paths = pathname
    .replace(/^\/(th|en)/, "")
    .split("/")
    .filter((path) => path && isNaN(Number(path))); // Filter out numeric segments

  // Function to generate href
  const generateHref = (index: number) => {
    const href = `/${locale}/` + paths.slice(0, index + 1).join("/");
    const id = searchParams.get("id");
    return id ? `${href}?id=${id}` : href;
  };

  // Function to format breadcrumb item text
  const formatText = (text: string) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (paths.length === 0) {
    return null; // Don't render anything if there are no paths
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const href = generateHref(index);
          const isLast = index === paths.length - 1;

          return (
            <BreadcrumbItem key={path}>
              {paths.length > 1 && index > 0 && <BreadcrumbSeparator />}
              {isLast ? (
                <BreadcrumbPage>{formatText(path)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{formatText(path)}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
