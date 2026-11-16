import Image from "next/image";

export default function Rules({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6!"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-title"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-md flex-col gap-8 rounded-lg bg-white p-8!"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2
            id="rules-title"
            className="text-3xl font-bold text-navy-900 uppercase"
          >
            Rules
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close rules"
            className="cursor-pointer p-2! opacity-50 transition-opacity hover:opacity-100"
          >
            <Image
              src="/assets/images/icon-close.svg"
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>

        <Image
          src="/assets/images/image-rules-bonus.svg"
          alt="Game rules diagram"
          width={400}
          height={400}
          className="mx-auto h-auto w-full max-w-sm object-contain"
        />
      </div>
    </div>
  );
}
