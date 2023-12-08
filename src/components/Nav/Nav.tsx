import { NavItem } from "../NavItem/NavItem";

interface NavProps {
    page: 'Home' | 'Skills' | 'Experience' | 'FAQ' | 'Articles';
}
export function Nav({page}: NavProps) {
    return (
        <nav className={`flex-none text-2xl`}>
            <div className={`flex flex-row`}>
                <div className={`basis-1/6`}></div>
                <ul className={`flex flex-row basis-4/6`}>
                    <li className={`grow`}>
                        <NavItem active={page === 'Home'} label={'Home'} to={`/`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem active={page === 'Skills'} label={`Skills`} to={`/`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem active={page === 'Experience'} label={`Experience`} to={`/`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem active={page === 'FAQ'} label={`FAQs`} to={`/`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem label={`Articles`} to={`/`} external={true} />
                    </li>
                </ul>
                <div className={`basis-1/6`}></div>
            </div>
        </nav>
    );
}
