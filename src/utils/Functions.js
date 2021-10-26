export const dateConverter = (format) => {
    if (!format) return "";

    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let result = new Date(format)
    let year = result.getFullYear()
    let month = result.getMonth()
    let date = result.getDate()

    let hour = result.getHours()
    let min = result.getMinutes()


    return `${hour}:${min} ${date} ${monthArray[month]}, ${year}`
}

export const getTokenFromLocalStorage = () => {
    try {
        const token = localStorage.getItem("accessToken");
        return token;
    } catch (err) {
        console.log(err)
    }
}

export const getFromLocalStorage = (value) => {
    const result = localStorage.getItem(value);
    return result
}

export const getCurrentYear = () => {
    const newDate = new Date()
    const currentYear = newDate.getFullYear()
    return currentYear
}

export const tableIndex = (index, realIndex) => {
    const value = index + realIndex
    const result = value.toString().padStart(3, "0")
    return result
}


export const search = (array, value, key) => {
    return array.filter(a => a[key].toLowerCase().includes(value.toLowerCase()))
}


export const dateToInputDate = (format) => {
    let result = new Date(format)
    let year = result.getFullYear()
    let monthRaw = result.getMonth() + 1
    let dayRaw = result.getDate()

    let month = monthRaw.toString().padStart(2, "0")
    let day = dayRaw.toString().padStart(2, "0")

    return `${year}-${month}-${day}`
}

export const reduceContentDisplay = (str) => {
    const result = str.substring(0, 80);
    const a = result.replace("<b>", " ")
    const b = a.replace("</b>", " ")
    const c = b.replace("</br>", " ")
    return c;
}

export const dayToString = (val) => {
    if (val === 0) {
        return "Sunday"
    } else if (val === 1) {
        return "Monday"
    } else if (val === 2) {
        return "Tuesday"
    } else if (val === 3) {
        return "Wednesday"
    } else if (val === 4) {
        return "Thursday"
    } else if (val === 5) {
        return "Friday"
    } else if (val === 6) {
        return "Saturday"
    }
}

export const role = (isAdminData) => {
    if(isAdminData === "Bet22"){
        return "22Bet"
    }
    else if(isAdminData === "Bet1x"){
        return "1xBet"
    }
    else{
        return isAdminData
    }
}

export const convertDbDateTimeToDate = (rawDate) => {
    const result = rawDate.split(" ")
    return result[0]
}