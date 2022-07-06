"use strict";

// Dependencies
const I2rys = require("../../../utils/i2rys")
const Request = require("request")
const Fs = require("fs")

// Main
function plugin(outputDir, callback){
    outputDir = `${outputDir}/results/proxyScraper/${Math.floor(Math.random() * 999999999999)}`
    Fs.mkdirSync(outputDir)

    HTTP_OR_HTTPS()
    function HTTP_OR_HTTPS(){
        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Grabbing some HTTP/HTTPS proxies.")
        Request(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all`, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "WARN", "LazyLeech Debugger:", "Looks like the HTTP/HTTPS proxies API is died.")
                I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Skipping...")
                Socks4()
                return
            }

            I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `${body.split("\n").length} HTTP/HTTPS proxies is grabbed.`)
            Fs.writeFileSync(`${outputDir}/http_or_https.txt`, body, "utf8")
            I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `Grabbed HTTP/HTTPS proxies is saved to ${outputDir}/http_or_https.txt`)
            Socks4()
            return
        })
    }

    function Socks4(){
        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Grabbing some Socks4 proxies.")
        Request(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=all&ssl=all&anonymity=alll`, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "WARN", "LazyLeech Debugger:", "Looks like the Socks4 proxies API is died.")
                I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Skipping...")
                Socks5()
                return
            }

            I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `${body.split("\n").length} Socks4 proxies is grabbed.`)
            Fs.writeFileSync(`${outputDir}/socks4.txt`, body, "utf8")
            I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `Grabbed Socks4 proxies is saved to ${outputDir}/socks4.txt`)
            Socks5()
            return
        })
    }

    function Socks5(){
        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Grabbing some Socks5 proxies.")
        Request(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=all&ssl=all&anonymity=alll`, function(err, res, body){
            if(err){
                I2rys.log("yellowish", "WARN", "LazyLeech Debugger:", "Looks like the Socks5 proxies API is died.")
                I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Skipping...")
                Done()
                return
            }

            I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `${body.split("\n").length} Socks5 proxies is grabbed.`)
            Fs.writeFileSync(`${outputDir}/socks5.txt`, body, "utf8")
            I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `Grabbed Socks5 proxies is saved to ${outputDir}/socks5.txt`)
            Done()
            return
        })
    }

    function Done(){
        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", `Results have been saved to ${outputDir}`)
        I2rys.log("yellowish", "INFO", "LazyLeech Debugger:", "Proxies scraper is finished.")
        callback()
        return
    }
}

module.exports = plugin