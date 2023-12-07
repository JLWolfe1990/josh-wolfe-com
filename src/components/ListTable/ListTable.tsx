interface ListTableProps {
    headers: string[];
    children: React.ReactNode;
}

export function ListTable({children, headers}: ListTableProps) {
    return(
        <ul className={`w-full text-whiteish`}>
            <li className={`w-full grid grid-cols-2 justify-items-center items-center bg-blackish h-16 border-2 border-blueish opacity-75`}>
                { (headers.map((header) => {
                    return <div key={header} className={``}>{header}</div>;
                }))
                }
            </li>

            {children}
        </ul>
    );
}