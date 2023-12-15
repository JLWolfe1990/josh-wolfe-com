import {FooterItem} from "../FooterItem/FooterItem.tsx";

export function Footer() {
    const borderStyles = `border-pinkish border-x-4 lg:border-x-8 border-t-4 lg:border-t-8`;

    return (
        <footer className={`flex-none opacity-75`}>
            <div className={`flex flex-row pt-2 px-4 lg:pt-6`}>
                <div className={`lg:basis-1/6`}></div>
                <ul className={`flex flex-row lg:basis-4/6 bg-whiteish ${borderStyles} rounded-t-3xl space-x-2 px-4 py-2`}>
                    <li className={`grow`}>
                        <FooterItem icon={"phone"} to={'tel:832-389-1266'} />
                    </li>
                    <li className={`grow`}>
                        <FooterItem icon={"email"} to={'mailto:josh@josh-wolfe.com'}/>
                    </li>
                    <li className={`grow`}>
                        <FooterItem icon={"linkedin"} to={"https://www.linkedin.com/in/joshua-l-wolfe/"}/>
                    </li>
                    <li className={`grow`}>
                        <FooterItem icon={"reddit"} to={"https://www.reddit.com/user/JLWolfe1990"}/>
                    </li>
                    <li className={`grow`}>
                        <FooterItem icon={"twitter"} to={"https://twitter.com/_joshwolfe"}/>
                    </li>
                    <li className={`grow`}>
                        <FooterItem icon={"medium"} to={"https://josh-wolfe.medium.com/"}/>
                    </li>
                </ul>
                <div className={`lg:basis-1/6`}></div>
            </div>
        </footer>
    );
}
