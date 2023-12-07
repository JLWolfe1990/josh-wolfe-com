import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";
import {SkillTypes} from "../../types/SkillTypes.ts";

interface PageSelectorProps {
    currentPage: string;
    pages: string[];
    setCurrentPage: (page: SkillTypes) => void;
}

export function PageSelector({ currentPage, setCurrentPage, pages }: PageSelectorProps) {
    const hasNextPage = () => {
        return pages.indexOf(currentPage) < pages.length - 1;
    }

    const hasPreviousPage = () => {
        return pages.indexOf(currentPage) > 0;
    }

    const onClickNextPage = () => {
        if (hasNextPage()) {
            setCurrentPage(pages[pages.indexOf(currentPage) + 1]);
        }
    }

    const onClickPreviousPage = () => {
        if (hasPreviousPage()) {
            setCurrentPage(pages[pages.indexOf(currentPage) - 1]);
        }
    }

    return (
        <div className={`flex flex-row grow-0 h-1/6 items-center justify-around text-2xl font-bold`}>
            <div className={``}>
                <img
                    src={arrowLeftIcon}
                    alt={'arrow left icon'}
                    onClick={onClickPreviousPage}
                    className={`${hasPreviousPage() ? 'visible' : 'hidden'}`} />
            </div>
            <div className={``}>{currentPage}</div>
            <div className={``}>
                <img
                    src={arrowRightIcon}
                    alt={'arrow right icon'}
                    onClick={onClickNextPage}
                    className={`${hasNextPage() ? 'visible' : 'hidden'}`} />
            </div>
        </div>
    );
}