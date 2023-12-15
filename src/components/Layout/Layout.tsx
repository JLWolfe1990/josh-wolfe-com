import {Nav} from "../Nav/Nav.tsx";
import {Footer} from "../Footer/Footer.tsx";

interface LayoutProps {
    page: 'Home' | 'Skills' | 'Experience' | 'FAQ' | 'Articles';
    hasPageMargins?: boolean;
    children: React.ReactNode;
}
export function Layout({page, children, hasPageMargins}: LayoutProps) {
    return (
        <div id={'layout-wrapper'} className={`overflow-hidden flex flex-col h-screen max-h-screen min-h-screen bg-home-mobile lg:bg-home-desktop bg-cover w-screen font-mono`}>
            <Nav page={page}/>
            <main className={`flex-1 overflow-y-auto`}>
                { hasPageMargins ? (
                    <div className={`flex flex-row w-full h-full max-h-full opacity-75`}>
                        <div className={`lg:basis-1/6`}></div>
                        <div className={`p-4 w-full lg:basis-4/6`}>
                            {hasPageMargins ? <div className={`lg:basis-1/6`}></div> : null}
                            {children}
                            {hasPageMargins ? <div className={`lg:basis-1/6`}></div> : null}
                        </div>
                        <div className={`lg:basis-1/6`}></div>
                    </div>
                )
                :
                children}
            </main>
            <Footer/>
        </div>
);
}