import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";
import {SkillTypes} from "../../types/SkillTypes.ts";

interface PageSelectorProps {
    currentPage: SkillTypes;
    pages: SkillTypes[];
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
        <div className={`flex grow-0 h-1/6 grid grid-cols-3 lg:justify-items-center items-center text-xl lg:text-2xl font-bold`}>
            <div className={`flex justify-items-start`}>
                <img
                    src={arrowLeftIcon}
                    alt={'arrow left icon'}
                    onClick={onClickPreviousPage}
                    className={`${hasPreviousPage() ? 'visible' : 'hidden'}`} />
            </div>
            <div className={`flex justify-center whitespace-nowrap`}>{currentPage}</div>
            <div className={`flex justify-end`}>
                <img
                    src={arrowRightIcon}
                    alt={'arrow right icon'}
                    onClick={onClickNextPage}
                    className={`${hasNextPage() ? 'visible' : 'hidden'}`} />
            </div>
        </div>
    );
}