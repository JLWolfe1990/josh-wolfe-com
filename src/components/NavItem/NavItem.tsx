import { Link } from "react-router-dom";

interface NavItemProps {
    label: string;
    to: string;
    active?: boolean;
    external?: boolean;
}
export function NavItem({ label, to, active, external }: NavItemProps) {
    const activeFontStyles = `font-bold text-white hover:text-blackish`;
    const inactiveFontStyles = `font-bold text-blackish hover:text-white`;
    const fontStyles = active ? activeFontStyles : inactiveFontStyles;
    const activeBgStyles = `bg-blackish hover:bg-whiteish`;
    const inactiveBgStyles = `bg-whiteish hover:bg-blackish`;
    const bgStyles = active ? activeBgStyles : inactiveBgStyles;
    const activeBorderStyles = `border-blackish hover:border-whiteish border-x-4 lg:border-x-8 border-b-4 lg:border-b-8`;
    const inactiveBorderStyles = `border-blueish hover:border-blackish border-4 lg:border-t-0 lg:border-x-8 lg:border-b-8`;
    const borderStyles = active ? activeBorderStyles : inactiveBorderStyles;
    const roundingStyles = `rounded-lg lg:rounded-none lg:rounded-b-3xl`;
    const spacingStyles = `p-2 lg:px-4 lg:pb-2 lg:pt-0`;
    const transitionStyles = `transition-colors duration-300 ease-in-out`;
    const transparencyStyles = `opacity-75 hover:opacity-100`;

    return (
        <div className={`flex flex-row justify-center items-center text-center h-full pb-4 lg:pb-6`}>
            <div className={`${fontStyles} ${bgStyles} ${borderStyles} ${roundingStyles} ${spacingStyles} ${transitionStyles} ${transparencyStyles} w-full lg:w-fit`}>
                { external ? (<Link rel="noopener noreferrer" target="_blank" to={to}>{label}</Link>) : (<Link to={to}>{label}</Link>) }
            </div>
        </div>
    );
}