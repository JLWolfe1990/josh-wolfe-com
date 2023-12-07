interface PaginatedContentProps {
    children: React.ReactNode;
}

export function PaginatedContent({children}: PaginatedContentProps) {
    return (
        <div className={`h-full max-h-full min-h-full text-whiteish`}>
            {children}
        </div>
    )
}