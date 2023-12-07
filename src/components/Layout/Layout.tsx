import {Nav} from "../Nav/Nav.tsx";
import {Footer} from "../Footer/Footer.tsx";

interface LayoutProps {
    page: 'Home' | 'Skills' | 'Experience' | 'FAQ' | 'Articles';
    children: React.ReactNode;
}
export function Layout({page, children}: LayoutProps) {
    return (
        <div id={'layout-wrapper'} className={`overflow-hidden flex flex-col h-screen max-h-screen min-h-screen bg-home-mobile lg:bg-home-desktop bg-cover w-screen font-mono`}>
            <Nav page={page}/>
            <main className={`flex-1 overflow-y-auto`}>
                {children}
            </main>
            <Footer />
        </div>
    );
}