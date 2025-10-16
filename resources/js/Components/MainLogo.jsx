import Logo from '../../images/logo.png';

export default function MainLogo({width="64"}) {
    return (
        <img
            className={`w-${width} max-w-full object-contain`}
            src={Logo}
            alt="Loan Management System"
        />
    );
}
