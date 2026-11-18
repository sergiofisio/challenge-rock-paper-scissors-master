export default function Text({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return <p className={`${className} font-bold uppercase`}>{label}</p>;
}
