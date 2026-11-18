"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/assets";
import { RULES_COPY } from "@/lib/game";

export default function RulesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="rules-title"
      className="fixed inset-0 m-auto max-h-[min(90vh,40rem)] w-[min(100%-2rem,28rem)] overflow-y-auto rounded-lg bg-white p-8 text-navy-900 backdrop:bg-black/50 open:flex open:flex-col open:gap-6"
    >
      <div className="flex items-center justify-between">
        <h2 id="rules-title" className="text-3xl font-bold uppercase">
          Rules
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close rules"
          className="cursor-pointer p-2 opacity-50 transition-opacity hover:opacity-100"
        >
          <Image
            src={asset("/assets/images/icon-close.svg")}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>

      <Image
        src={asset("/assets/images/image-rules-bonus.svg")}
        alt=""
        width={400}
        height={400}
        className="mx-auto h-auto w-full max-w-sm object-contain"
        aria-hidden
      />

      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-navy-900/85">
        {RULES_COPY.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </dialog>
  );
}
