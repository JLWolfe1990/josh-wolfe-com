import {Icon} from "../Icon/Icon.tsx";
interface FooterItemProps {
    icon: 'phone' | 'reddit' | 'medium' | 'github' | 'linkedin' | 'twitter' | 'email';
    to: string;
}

export function FooterItem({icon, to}: FooterItemProps) {
    return (
        <div className={`flex flex-col items-center justify-center`}>
            <div className={`flex-none`}>
                <a href={to} target="_blank" rel={"noreferrer"}>
                    <Icon key={icon} icon={icon} />
                </a>
            </div>
        </div>
    );
}