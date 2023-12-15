import { NavItem } from "../NavItem/NavItem";
import barsIcon from "../../assets/icons/bars-solid.svg";
import xmarkIcon from "../../assets/icons/xmark-solid.svg";
import {useState} from "react";

interface NavProps {
    page: 'Home' | 'Skills' | 'Experience' | 'FAQ' | 'Articles';
}
export function Nav({page}: NavProps) {
    // use state to track whether the nav is open or closed
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`flex-none text-sm lg:text-2xl min-h-[88px]`}>
            <div className={`${isOpen ? 'sm:visible' : 'hidden'} lg:hidden absolute top-0 right-0 w-full p-4 z-10`}>
                <div
                    className={`flex flex-col items-center justify-center opacity-100 text-black w-full p-4 border-4 border-pinkish rounded-lg bg-whiteish`}>
                    <div className={'flex flex-row w-full p-0 justify-end'}>
                        <div
                          className={`flex h-14 w-14 justify-end items-start`}
                          onClick={() => {
                              console.log('clicked');
                              setIsOpen(!isOpen)}}
                        >
                            <img
                              src={xmarkIcon}
                              alt={'navigation close icon'} />
                        </div>
                    </div>
                    <ul className={`flex flex-col m-0 w-full list-none`}>
                        <li>
                            <NavItem active={page === 'Home'} label={'Home'} to={`/`} />
                        </li>
                        <li>
                            <NavItem active={page === 'Skills'} label={`Skills`} to={`/skills`} />
                        </li>
                        <li>
                            <NavItem active={page === 'Experience'} label={`Experience`} to={`/experience`} />
                        </li>
                        <li>
                            <NavItem active={page === 'FAQ'} label={`FAQs`} to={`/faq`} />
                        </li>
                        <li>
                            <NavItem label={`Articles`} to={`https://josh-wolfe.medium.com/`} external={true} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`lg:hidden flex flex-row items-center justify-end space-x-6 h-full opacity-90 text-black w-full p-4`}>
                <div
                  className={`${isOpen ? 'hidden' : 'visible'} flex h-14 w-14 border-4 border-blueish rounded-full justify-center items-center bg-whiteish`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                      src={barsIcon}
                      alt={'navigation icon'} />
                </div>
            </div>

            <div className={`hidden lg:flex flex flex-row`}>
                <div className={`basis-1/6`}></div>
                <ul className={`flex flex-row basis-4/6`}>
                    <li className={`grow`}>
                        <NavItem active={page === 'Home'} label={'Home'} to={`/`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem active={page === 'Skills'} label={`Skills`} to={`/skills`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem active={page === 'Experience'} label={`Experience`} to={`/experience`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem active={page === 'FAQ'} label={`FAQs`} to={`/faq`} />
                    </li>
                    <li className={`grow`}>
                        <NavItem label={`Articles`} to={`https://josh-wolfe.medium.com/`} external={true} />
                    </li>
                </ul>
                <div className={`basis-1/6`}></div>
            </div>
        </nav>
    );
}
