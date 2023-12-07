import phoneIcon from "../../assets/icons/phone.svg";
import emailIcon from "../../assets/icons/email.svg";
import redditIcon from "../../assets/icons/reddit.svg";
import mediumIcon from "../../assets/icons/medium.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";

interface IconProps {
    icon: 'phone' | 'reddit' | 'medium' | 'github' | 'linkedin' | 'twitter' | 'email';
}

export function Icon({icon}: IconProps) {
    switch (icon) {
        case "email":
            return <img src={emailIcon} alt={`${icon} icon`} />;
        case "phone":
            return <img src={phoneIcon} alt={`${icon} icon`} />;
        case "reddit":
            return <img src={redditIcon} alt={`${icon} icon`} />;
        case "medium":
            return <img src={mediumIcon} alt={`${icon} icon`} />;
        case "twitter":
            return <img src={twitterIcon} alt={`${icon} icon`} />;
        case "linkedin":
            return <img src={linkedinIcon} alt={`${icon} icon`} />;
        default:
            return <></>;
    }
}