"use strict";

//Dependencies
const moment = require("moment")
const chalk = require("chalk")

//Main
function log(theme, type, name, message){
    theme = theme.toLowerCase()
    type = type.toLowerCase()

    if(theme == "yellowish"){
        if(type == "info"){
            console.log(`${chalk.grey("[")+chalk.rgb(255, 159, 15)(moment().format())+chalk.grey("]")} ${chalk.blueBright(name)} ${message}`)
        }else if(type == "warn"){
            console.log(`${chalk.grey("[")+chalk.rgb(255, 159, 15)(moment().format())+chalk.grey("]")} ${chalk.yellowBright(name)} ${message}`)
        }else if(type == "error"){
            console.log(`${chalk.grey("[")+chalk.rgb(255, 159, 15)(moment().format())+chalk.grey("]")} ${chalk.red(name)} ${message}`)
        }else if(type == "critical"){
            console.log(`${chalk.grey("[")+chalk.rgb(255, 159, 15)(moment().format())+chalk.grey("]")} ${chalk.redBright(name)} ${message}`)
        }
    }else if(theme == "orangewish"){
        if(type == "info"){
            console.log(`${chalk.grey("[")+chalk.rgb(247, 110, 5)(moment().format())+chalk.grey("]")} ${chalk.blueBright(name)} ${message}`)
        }else if(type == "warn"){
            console.log(`${chalk.grey("[")+chalk.rgb(247, 110, 5)(moment().format())+chalk.grey("]")} ${chalk.yellowBright(name)} ${message}`)
        }else if(type == "error"){
            console.log(`${chalk.grey("[")+chalk.rgb(247, 110, 5)(moment().format())+chalk.grey("]")} ${chalk.red(name)} ${message}`)
        }else if(type == "critical"){
            console.log(`${chalk.grey("[")+chalk.rgb(247, 110, 5)(moment().format())+chalk.grey("]")} ${chalk.redBright(name)} ${message}`)
        }
    }else if(theme == "bloody"){
        if(type == "info"){
            console.log(`${chalk.rgb(245, 84, 78)("[")+chalk.rgb(158, 29, 17)(moment().format())+chalk.rgb(245, 84, 78)("]")} ${chalk.blueBright(name)} ${message}`)
        }else if(type == "warn"){
            console.log(`${chalk.rgb(245, 84, 78)("[")+chalk.rgb(158, 29, 17)(moment().format())+chalk.rgb(245, 84, 78)("]")} ${chalk.yellowBright(name)} ${message}`)
        }else if(type == "error"){
            console.log(`${chalk.rgb(245, 84, 78)("[")+chalk.rgb(158, 29, 17)(moment().format())+chalk.rgb(245, 84, 78)("]")} ${chalk.red(name)} ${message}`)
        }else if(type == "critical"){
            console.log(`${chalk.rgb(245, 84, 78)("[")+chalk.rgb(158, 29, 17)(moment().format())+chalk.rgb(245, 84, 78)("]")} ${chalk.redBright(name)} ${message}`)
        }
    }
}

//Exporter
module.exports = {
    log: log
}