import {Layout} from "../components/Layout/Layout.tsx";
import profilePhoto from '../assets/profile.svg';
import phoneIcon from "../assets/phone.svg";
import emailIcon from "../assets/email.svg";
import {Pages} from "../types/Pages.ts";
export function HomePage() {
    return (
        <Layout page={Pages.Home}>
            <div className={`flex flex-row flex-wrap items-center justify-center lg:space-x-6 space-y-4 h-full opacity-90 p-4`}>
                <img src={profilePhoto} alt={'profile image'} className={`opacity-100`} />
                <div className={`flex flex-col items-center justify-center bg-whiteish border-pinkish border-4 lg:border-8 rounded-tl-3xl rounded-br-3xl lg:h-[512px] p-4 lg:py-12 lg:px-6 space-y-4`}>
                    <h1 className={`text-2xl lg:text-4xl font-bold`}>
                        Josh Wolfe, M.B.A. (IT Administration)
                    </h1>
                    <h2 className={`pt-3 text-lg lg:text-2xl font-normal`}>
                        Rapid Application Development Specialist
                    </h2>
                    <div className={`grow`}></div>
                    <div className={`flex flex-row w-full space-x-6 items-center`}>
                        <div className={`flex grow justify-center lg:justify-normal lg:basis-1/2 bg-blackish border-pinkish border-4 rounded-tl-3xl rounded-br-3xl px-3 py-1 w-fit items-center h-24`}>
                            <a href={`tel:832-389-1266`}>
                                <img src={phoneIcon} alt={'phone icon'} className={``} />
                            </a>
                            <div className={`hidden lg:flex grow text-2xl text-whiteish items-center justify-center`}>
                                832.389.1266
                            </div>
                        </div>
                        <div className={`flex grow justify-center lg:justify-normal lg:basis-1/2 bg-blackish border-pinkish border-4 rounded-tr-3xl rounded-bl-3xl px-3 py-1 w-fit items-center h-24`}>
                            <a href={`mailto:josh@josh-wolfe.com`}>
                                <img src={emailIcon} alt={'email icon'} className={``} />
                            </a>
                            <div className={`hidden lg:flex grow text-2xl text-whiteish items-center justify-center`}>
                                josh@josh-wolfe.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}