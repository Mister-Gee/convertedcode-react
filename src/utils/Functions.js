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

// export const getUserRole = () => {
//     const token = localStorage.getItem("token")
//     const decodedToken = jwt_decode(token)
//     const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
//     return userRole
// }

export const search = (array, value, key) => {
    return array.filter(a => a[key].toLowerCase().includes(value.toLowerCase()))
}

// export const getInstitutionId = () => {
//     const institutionId = localStorage.getItem("institutionId")
//     return institutionId
// }

// export const getWebUserId = () => {
//     const webUserId = localStorage.getItem("webUserId")
//     return webUserId
// }

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
    return str.substring(0, 80);
}