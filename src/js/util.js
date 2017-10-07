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
    const time = new Date(timeStamp * 1000);
    let month = addZero(time.getMonth()),
        day = addZero(time.getDay()),
        hours = addZero(time.getHours()),
        minute = addZero(time.getMinutes()),
        seconds = addZero(time.getSeconds());
    return `${month}-${day} ${hours}:${minute}:${seconds}`
};

export const throttle = function (method, context, event) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context, event);
    }, 100);
}


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

function addZero(char) {
    let res = parseInt(char, 10) < 10 ? '0' + char : char;
    return res;
}