interface PaginatedBodyProps {
    visible: boolean;
    children: React.ReactNode;
}

export function PaginatedBody({visible, children}: PaginatedBodyProps) {
    return (
        <div className={`${visible ? 'visible' : 'hidden'} h-5/6 border border-4 rounded-3xl border-pinkish radius-3xl bg-whiteish p-6`}>
            <div className={`overflow-auto text-blackish w-full h-full`}>
                {children}
            </div>
        </div>
    );
}