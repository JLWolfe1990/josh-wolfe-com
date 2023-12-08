import { Link } from "react-router-dom";

interface NavItemProps {
    label: string;
    to: string;
    active?: boolean;
    external?: boolean;
}
export function NavItem({ label, to, active }: NavItemProps) {
    const activeFontStyles = `font-bold text-white hover:text-blackish`;
    const inactiveFontStyles = `font-bold text-blackish hover:text-white`;
    const fontStyles = active ? activeFontStyles : inactiveFontStyles;
    const activeBgStyles = `bg-blackish hover:bg-whiteish`;
    const inactiveBgStyles = `bg-whiteish hover:bg-blackish`;
    const bgStyles = active ? activeBgStyles : inactiveBgStyles;
    const activeBorderStyles = `border-blackish hover:border-whiteish border-x-4 lg:border-x-8 border-b-4 lg:border-b-8`;
    const inactiveBorderStyles = `border-blueish hover:border-blackish border-x-4 lg:border-x-8 border-b-4 lg:border-b-8`;
    const borderStyles = active ? activeBorderStyles : inactiveBorderStyles;
    const roundingStyles = `rounded-b-3xl`;
    const spacingStyles = `px-2 lg:px-4 pb-1 lg:pb-2 pt-0 lg:pt-0`;
    const transitionStyles = `transition-colors duration-300 ease-in-out`;
    const transparencyStyles = `opacity-75 hover:opacity-100`;

    return (
        <div className={`flex flex-row justify-center items-center h-full pb-2 lg:pb-6`}>
            <div className={`${fontStyles} ${bgStyles} ${borderStyles} ${roundingStyles} ${spacingStyles} ${transitionStyles} ${transparencyStyles}`}>
                <Link to={to}>{label}</Link>
            </div>
        </div>
    );
}