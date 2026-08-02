import { Orb } from "@/components/ui/Orb";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative h-16 w-16">
        <Orb
          tone="sunset"
          rays
          spin
          className="inset-0 h-16 w-16"
          opacity={0.95}
        />
      </div>
    </div>
  );
}
