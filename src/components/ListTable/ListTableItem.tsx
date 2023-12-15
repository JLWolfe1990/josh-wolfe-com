interface ListTableItemProps {
    values: { [key: string]: string };
}

export function ListTableItem({values}: ListTableItemProps) {
    return (
        (Object.keys(values).map((key) => {
            return (
                <li key={key} className={`w-full grid grid-cols-2 justify-items-center items-center text-center bg-blackish h-16 border-2 border-blueish mt-6 p-2`}>
                    <div key={key} className={``}>{key}</div>
                    <div key={values[key]} className={``}>{values[key]}</div>
                </li>
            );
        }))
    );
}