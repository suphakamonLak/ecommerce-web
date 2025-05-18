import moment from 'moment/min/moment-with-locales'

export const dateFormat = (date) => {
    return moment(date).locale('th').format('LL')
}

export const dateFormatDay = (date) => {
    return moment(date).locale('th').format('dddd Do MMM ')
}

export const dateFormatmonth = (date) => {
    return moment(date).locale('th').format('MMM')
}