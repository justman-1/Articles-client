module.exports = class DateObj{
    constructor(){
        let date = new Date()

        let now = ''
        if(date.getDate() < 10) now = now + '0' + date.getDate() + '.'
        else{ now = now + date.getDate() + '.' }

        if(date.getMonth() < 10) now = now + '0' + date.getMonth() + '.'
        else{ now = now + date.getMonth() + '.' }
        now = now + date.getFullYear()

        let time = ''
        if(date.getHours() < 10) time = time + '0' + date.getHours() + ':'
        else{ time = time + date.getHours() + ':' }

        if(date.getMinutes() < 10) time = time + '0' + date.getMinutes()
        else{ time = time + date.getMinutes() }

        this.date = now
        this.time = time
    }
}