import {Layout} from "../components/Layout/Layout.tsx";
import profilePhoto from '../assets/profile.svg';
import phoneIcon from "../assets/phone.svg";
import emailIcon from "../assets/email.svg";
export function Home() {
    return (
        <Layout page={'Home'}>
            <div className={`flex flex-row items-center justify-center space-x-6 h-full opacity-90`}>
                <img src={profilePhoto} alt={'profile image'} className={`opacity-100`} />
                <div className={`flex flex-col items-center justify-center bg-whiteish border border-pinkish border-8 rounded-tl-3xl rounded-br-3xl h-[512px] py-12 px-6`}>
                    <h1 className={`px-3 text-4xl font-bold`}>
                        Josh Wolfe, M.B.A. (IT Administration)
                    </h1>
                    <h2 className={`pt-3 text-2xl font-normal`}>
                        Rapid Application Development Specialist
                    </h2>
                    <div className={`grow`}></div>
                    <div className={`flex flex-row w-full space-x-6 items-center`}>
                        <div className={`flex grow basis-1/2 bg-blackish border border-pinkish border-4 rounded-tl-3xl rounded-br-3xl px-3 py-1 w-fit items-center h-24`}>
                            <a href={`tel:832-389-1266`}>
                                <img src={phoneIcon} alt={'phone icon'} className={``} />
                            </a>
                            <div className={`flex grow text-2xl text-whiteish items-center justify-center`}>
                                832.389.1266
                            </div>
                        </div>
                        <div className={`flex grow basis-1/2 bg-blackish border border-pinkish border-4 rounded-tr-3xl rounded-bl-3xl px-3 py-1 w-fit items-center h-24`}>
                            <a href={`mailto:josh@josh-wolfe.com`}>
                                <img src={emailIcon} alt={'email icon'} className={``} />
                            </a>
                            <div className={`flex grow text-2xl text-whiteish items-center justify-center`}>
                                josh@josh-wolfe.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}