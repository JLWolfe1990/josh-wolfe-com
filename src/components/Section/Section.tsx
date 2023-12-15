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
            <div className={`items-center p-4 lg:p-6 border-pinkish border-4 bg-whiteish rounded-lg lg:rounded-3xl space-y-4`}>
                <div className={`flex flex-row flex-wrap justify-between font-bold text-lg lg:text-2xl space-y-4 lg:space-y-0`}>
                    <div className={`flex`}>{title}</div>
                    { date && (
                      <>
                          <div className={`lg:hidden flex justify-between w-full`}>
                              <div className={'flex lg:hidden'}>Term:</div>
                              <div className={`flex whitespace-nowrap`}>{date}</div>
                          </div>
                          <div className={`hidden lg:flex whitespace-nowrap m-0`}>{date}</div>
                      </>
                    )}
                </div>
                {subtitle && <div className={`pt-2 text-lg lg:text-xl`}>{subtitle}</div>}
            </div>
            <div className={`${expanded ? 'visible' : 'hidden'} flex flex-row`}>
                <div className={`basis-1/12`}></div>
                <div
                    className={`basis-10/12 max-h-96 overflow-y-auto border-pinkish border-4 border-t-0 rounded-b-lg lg:rounded-b-3xl bg-whiteish p-4 lg:p-6`}>
                    {children}
                </div>
                <div className={`basis-1/12`}></div>
            </div>
        </section>
    );
}