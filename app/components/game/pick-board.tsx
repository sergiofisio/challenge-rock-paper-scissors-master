import Image from "next/image";
import Hand from "@/app/components/hand";
import type { HandType } from "@/lib/game";
import { asset } from "@/lib/assets";

const PICKS: { type: HandType; position: string }[] = [
  {
    type: "scissors",
    position: "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3",
  },
  {
    type: "paper",
    position: "absolute top-[32%] right-0 translate-x-1/3",
  },
  {
    type: "rock",
    position: "absolute bottom-0 right-[12%] translate-y-1/4",
  },
  {
    type: "lizard",
    position: "absolute bottom-0 left-[12%] translate-y-1/4",
  },
  {
    type: "spock",
    position: "absolute top-[32%] left-0 -translate-x-1/3",
  },
];

export default function PickBoard({
  onPick,
}: {
  onPick: (hand: HandType) => void;
}) {
  return (
    <div className="relative mt-8 size-[min(72vw,18rem)] lg:mt-4 lg:size-104">
      <Image
        src={asset("/assets/images/bg-pentagon.svg")}
        alt=""
        fill
        className="object-contain p-[12%] lg:p-12"
        aria-hidden
      />

      {PICKS.map(({ type, position }) => (
        <Hand
          key={type}
          type={type}
          size="sm"
          position={position}
          onClick={() => onPick(type)}
        />
      ))}
    </div>
  );
}
