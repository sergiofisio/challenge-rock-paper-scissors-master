export default function ScoreLabel({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return <p className={`${className} font-bold uppercase`}>{label}</p>;
}
