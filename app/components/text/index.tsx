

export default function Text({label, className}: {label: string, className: string}) {
    return <h1 className={`${className} font-bold uppercase`}>{label}</h1>
}