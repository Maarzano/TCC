const temHttp = (str) => {
    return str?.includes("http");
}

export const placeholder = (str) => {
    if (!temHttp(str)){
        return "https://cdn-icons-png.flaticon.com/512/8136/8136031.png";
    } else {
        return str;
    }
}

export const placeholderProfile = (str) => {
    if (!temHttp(str)){
        return "data:image/svg+xml;utf8,<svg width='600px' height='600px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23ffffff'><g id='SVGRepo_bgCarrier' stroke-width='0'/><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/><g id='SVGRepo_iconCarrier'> <path d='M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z' fill='%23ffffff'/> <path d='M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z' fill='%23ffffff' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/> <circle cx='12' cy='12' r='10' stroke='%23ffffff' stroke-width='2'/> </g></svg>";
    } else {
        return str;
    }
}