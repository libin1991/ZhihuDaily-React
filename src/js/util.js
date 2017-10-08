export const replaceUrl = (srcUrl) => {
    return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
};

export const formatDate = (str) => {
    let year = str.slice(0, 4);
    let month = str.slice(4, 6);
    let day = str.slice(6);
    let week = getWeek(new Date(`${year}/${month}/${day}`));
    return `${month}月${day}日 ${week}`;
};

export const formatTimeStamp = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    let Y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (i < 10) {
        i = '0' + i;
    }
    if (s < 10) {
        s = '0' + s;
    }
    var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
    return t;
};


function getWeek(date) {
    let week,
        day = date.getDay();
    if (day === 0) week = "星期日";
    if (day === 1) week = "星期一";
    if (day === 2) week = "星期二";
    if (day === 3) week = "星期三";
    if (day === 4) week = "星期四";
    if (day === 5) week = "星期五";
    if (day === 6) week = "星期六";
    return week;
}


