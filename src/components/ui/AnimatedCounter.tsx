"use client";

import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface AnimatedCounterProps {
  value: string; // "500+" or "99%"
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useCounterAnimation(target, suffix);

  return <span ref={ref}>0{suffix}</span>;
}
