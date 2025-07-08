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