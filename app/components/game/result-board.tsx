import Hand from "@/app/components/hand";
import type { GameResult, GameStep, HandType } from "@/lib/game";
import { resultLabel } from "@/lib/game";

interface ResultBoardProps {
  step: Exclude<GameStep, "pick">;
  player: HandType;
  house: HandType | null;
  result: GameResult | null;
  onPlayAgain: () => void;
}

function Slot({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-6 lg:gap-10">
      <p className="order-2 text-sm font-bold tracking-[0.2em] text-white uppercase lg:order-1 lg:text-base">
        {label}
      </p>
      <div className="order-1 flex size-36 items-center justify-center lg:order-2 lg:size-52">
        {children}
      </div>
    </div>
  );
}

function Outcome({
  result,
  onPlayAgain,
  className = "",
}: {
  result: GameResult;
  onPlayAgain: () => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <h2 className="text-5xl font-bold tracking-wide text-white uppercase">
        {resultLabel(result)}
      </h2>
      <button
        type="button"
        onClick={onPlayAgain}
        className="rounded-lg bg-white px-12! py-3! text-sm font-bold tracking-[0.2em] text-navy-900 uppercase transition-colors hover:text-red-600 cursor-pointer"
      >
        Play again
      </button>
    </div>
  );
}

export default function ResultBoard({
  step,
  player,
  house,
  result,
  onPlayAgain,
}: ResultBoardProps) {
  const showResult = step === "result" && result !== null;
  const playerWins = result === "win";
  const houseWins = result === "lose";

  return (
    <div className="mt-10 flex w-full max-w-5xl flex-col items-center gap-10 lg:mt-16">
      <div className="flex w-full items-center justify-center gap-6 sm:gap-12 lg:gap-16">
        <Slot label="You picked">
          <Hand
            type={player}
            size="lg"
            winner={showResult ? playerWins : false}
          />
        </Slot>

        {showResult && (
          <Outcome
            result={result}
            onPlayAgain={onPlayAgain}
            className="hidden lg:flex"
          />
        )}

        <Slot label="The house picked">
          {step === "waiting" || !house ? (
            <span
              aria-hidden
              className="size-28 rounded-full bg-black/25 lg:size-40"
            />
          ) : (
            <Hand
              type={house}
              size="lg"
              winner={showResult ? houseWins : false}
              className="animate-[fade-in_0.35s_ease-out]"
            />
          )}
        </Slot>
      </div>

      {showResult && (
        <Outcome
          result={result}
          onPlayAgain={onPlayAgain}
          className="lg:hidden"
        />
      )}
    </div>
  );
}
