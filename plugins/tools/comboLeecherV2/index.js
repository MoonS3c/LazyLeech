"use strict";

// Dependencies
const I2rys = require("../../../utils/i2rys")
const dialogy = require("dialogy")
const Request = require("request")
const { JSDOM } = require("jsdom")
const Fs = require("fs")

// Variables
const comboLeecherV2 = {
    searchEngines: ["https://search.aol.com/aol/search?q=", "https://www.ask.com/web?q=", "https://duckduckgo.com/?num=100&q=", "https://www.bing.com/search?num=100&q=", "https://search.yahoo.com/search?q="],
    results: "",
    links: []
}

// Main
async function plugin(outputDir, callback){
    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Note: The got accounts will automatically save. The only way to stop this checking is to exit the program/CTRL + C.")
    outputDir = `${outputDir}/results/comboLeecherV2`

    const randomNumbers = Math.floor(Math.random() * 999999999999)
    const fileName = `${outputDir}/${randomNumbers}.txt`

    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Results will be save to ${fileName}`)

    Fs.writeFileSync(fileName, "", "utf8")

    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Your keywords file path.")
    const keywordsFile = dialogy.openFile({
        filter: {
            patterns: ["*.txt"],
            description: "Keywords File"
        }
    })

    const keywords = Fs.readFileSync(keywordsFile, "utf8").split("\n")
    var keywordsLength = keywords.length

    keywordsLength = keywordsLength * 5

    var sessionIndex = 0

    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Combo leeching has started.")
    setInterval(()=>{
        for( const keyword of keywords ){
            if(keyword){
                for( const searchEngine of comboLeecherV2.searchEngines ) gatherLinks(searchEngine, keyword)
            }else{
                keywordsLength--
            }
        }
    }, 1000)

    function gatherLinks(search_engine, keyword){
        if(search_engine == "https://search.aol.com/aol/search?q="){
            Request(`${search_engine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                keywordsLength += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `In: ${sessionIndex}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        console.log("Error detected. Exiting...")
                        return
                    }
    
                    return
                }
    
                const dom = new JSDOM(body)
                var links = []

                dom.window.document.querySelectorAll("div > div> h3.title > a").forEach(link =>{
                    links.push(link.getAttribute("href"))
                })

                if(links.length == 0){
                    return
                }else{
                    for( const link of links ){
                        Request(link, {
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                            },
                            timeout: 5000
                        }, function(err, res, body){
                            const data = Fs.readFileSync(fileName, "utf-8")

                            if(err){
                                return
                            }
            
                            const emails_and_passwords = body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)
            
                            if(typeof(emails_and_passwords) == "object"){
                                for( let i in emails_and_passwords ){
                                    if(comboLeecherV2.results.indexOf(emails_and_passwords[i]) == -1){              
                                        if(data.length == 0){
                                            Fs.writeFileSync(fileName, emails_and_passwords[i], "utf8")
                                        }else{
                                            Fs.writeFileSync(fileName, `${data}\n${emails_and_passwords[i]}`, "utf8")
                                        }
                                    }
                                }
                            }

            
                            return
                        })
                    }
                }

                return
            })
        }else if(search_engine == "https://www.ask.com/web?q="){
            Request(`${search_engine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                keywordsLength += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `In: ${sessionIndex}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        console.log("Error detected. Exiting...")
                        return
                    }
    
                    return
                }
    
                const dom = new JSDOM(body)
                var links = []

                dom.window.document.querySelectorAll("div > div.PartialSearchResults-results > div > div.PartialSearchResults-item-title > a").forEach(link =>{
                    links.push(link.getAttribute("href"))
                })

                if(links.length == 0){
                    return
                }else{
                    for( const link of links ){
                        Request(link, {
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                            },
                            timeout: 5000
                        }, function(err, res, body){
                            const data = Fs.readFileSync(fileName, "utf-8")

                            if(err){

                                return
                            }
            
                            const emails_and_passwords = body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)
            
                            if(typeof(emails_and_passwords) == "object"){
                                for( let i in emails_and_passwords ){
                                    if(comboLeecherV2.results.indexOf(emails_and_passwords[i]) == -1){              
                                        if(data.length == 0){
                                            Fs.writeFileSync(fileName, emails_and_passwords[i], "utf8")
                                        }else{
                                            Fs.writeFileSync(fileName, `${data}\n${emails_and_passwords[i]}`, "utf8")
                                        }
                                    }
                                }
                            }
            
                            

            
                            return
                        })
                    }
                }

                return
            })
        }else if(search_engine == "https://duckduckgo.com/?num=100&q="){
            Request(`${search_engine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                keywordsLength += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `In: ${sessionIndex}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        console.log("Error detected. Exiting...")
                        return
                    }
    
                    return
                }
    
                const dom = new JSDOM(body)
                var links = []

                dom.window.document.querySelectorAll("div > h2 > a.result__a.js-result-title-link").forEach(link =>{
                    links.push(link.getAttribute("href"))
                })

                if(links.length == 0){
                    return
                }else{
                    for( const link of links ){
                        Request(link, {
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                            },
                            timeout: 5000
                        }, function(err, res, body){
                            const data = Fs.readFileSync(fileName, "utf-8")

                            if(err){

                                return
                            }
            
                            const emails_and_passwords = body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)
            
                            if(typeof(emails_and_passwords) == "object"){
                                for( let i in emails_and_passwords ){
                                    if(comboLeecherV2.results.indexOf(emails_and_passwords[i]) == -1){              
                                        if(data.length == 0){
                                            Fs.writeFileSync(fileName, emails_and_passwords[i], "utf8")
                                        }else{
                                            Fs.writeFileSync(fileName, `${data}\n${emails_and_passwords[i]}`, "utf8")
                                        }
                                    }
                                }
                            }
            
                            return
                        })
                    }
                }

                return
            })
        }else if(search_engine == "https://www.bing.com/search?num=100&q="){
            Request(`${search_engine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                keywordsLength += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `In: ${sessionIndex}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        console.log("Error detected. Exiting...")
                        return
                    }
    
                    return
                }
    
                const dom = new JSDOM(body)
                var links = []

                dom.window.document.querySelectorAll("#b_results > li > h2 > a").forEach(link =>{
                    links.push(link.getAttribute("href"))
                })

                if(links.length == 0){
                    return
                }else{
                    for( const link of links ){
                        Request(link, {
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                            },
                            timeout: 5000
                        }, function(err, res, body){
                            const data = Fs.readFileSync(fileName, "utf-8")

                            if(err){

                                return
                            }
            
                            const emails_and_passwords = body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)
            
                            if(typeof(emails_and_passwords) == "object"){
                                for( let i in emails_and_passwords ){
                                    if(comboLeecherV2.results.indexOf(emails_and_passwords[i]) == -1){              
                                        if(data.length == 0){
                                            Fs.writeFileSync(fileName, emails_and_passwords[i], "utf8")
                                        }else{
                                            Fs.writeFileSync(fileName, `${data}\n${emails_and_passwords[i]}`, "utf8")
                                        }
                                    }
                                }
                            }
            
                            

            
                            return
                        })
                    }
                }

                return
            })
        }else if(search_engine == "https://search.yahoo.com/search?q="){
            Request(`${search_engine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                keywordsLength += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `In: ${sessionIndex}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        console.log("Error detected. Exiting...")
                        return
                    }
    
                    return
                }
    
                const dom = new JSDOM(body)
                var links = []

                dom.window.document.querySelectorAll("div > div > h3 > a").forEach(link =>{
                    links.push(link.getAttribute("href"))
                })

                if(links.length == 0){
                    return
                }else{
                    for( const link of links ){
                        Request(links, {
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                            },
                            timeout: 5000
                        }, function(err, res, body){
                            const data = Fs.readFileSync(fileName, "utf-8")

                            if(err){

                                return
                            }
            
                            const emails_and_passwords = body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)
            
                            if(typeof(emails_and_passwords) == "object"){
                                for( let i in emails_and_passwords ){
                                    if(comboLeecherV2.results.indexOf(emails_and_passwords[i]) == -1){              
                                        if(data.length == 0){
                                            Fs.writeFileSync(fileName, emails_and_passwords[i], "utf8")
                                        }else{
                                            Fs.writeFileSync(fileName, `${data}\n${emails_and_passwords[i]}`, "utf8")
                                        }
                                    }
                                }
                            }
            
                            

            
                            return
                        })
                    }
                }

                return
            })
        }
    }
}

module.exports = plugin