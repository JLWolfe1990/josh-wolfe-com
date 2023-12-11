interface SectionProps {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    expanded?: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

export function Section({id, title, subtitle, date, expanded, children, onClick}: SectionProps) {
    return (
        <section id={id} onClick={onClick}>
            <div className={`items-center p-6 border border-pinkish border-4 bg-whiteish rounded-3xl`}>
                <div className={`flex flex-row justify-between font-bold text-2xl`}>
                    <div>{title}</div>
                    <div className={`whitespace-nowrap`}>{date}</div>
                </div>
                {subtitle && <div className={`pt-2 text-xl`}>{subtitle}</div>}
            </div>
            <div className={`${expanded ? 'visible' : 'hidden'} flex flex-row`}>
                <div className={`basis-1/12`}></div>
                <div
                    className={`basis-10/12 max-h-96 overflow-y-auto border-pinkish border-4 border-t-0 rounded-b-3xl bg-whiteish p-6`}>
                    {children}
                </div>
                <div className={`basis-1/12`}></div>
            </div>
        </section>
    );
}