"use strict";

// Dependencies
const I2rys = require("../../../utils/i2rys")
const dialogy = require("dialogy")
const Request = require("request")
const { JSDOM } = require("jsdom")
const fs = require("fs")

// Variables
const comboLeecher = {
    searchEngines: ["https://search.aol.com/aol/search?q=", "https://www.ask.com/web?q=", "https://duckduckgo.com/?num=100&q=", "https://www.bing.com/search?num=100&q=", "https://search.yahoo.com/search?q="],
    results: "",
    links: []
}


// Main
async function plugin(outputDir, callback){
    outputDir = `${outputDir}/results/comboLeecher`

    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Your keywords file path.")
    const keywordsFile = dialogy.openFile({
        filter: {
            patterns: ["*.txt"],
            description: "Keywords File"
        }
    })

    const keywords = fs.readFileSync(keywordsFile, "utf8").split("\n")
    var keywordsLength = keywords.length

    keywordsLength = keywordsLength * 5 - 4

    var sessionIndex = 0

    I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Combo leeching has started.(This might take a while)")
    for( const keyword of keywords ){
        if(keyword){
            for( const searchEngine of comboLeecher.searchEngines ){
                gatherLinks(searchEngine, keyword)
            }
        }else{
            keywordsLength--
        }
    }

    function gatherLinks(searchEngine, keyword){
        if(searchEngine == "https://search.aol.com/aol/search?q="){
            Request(`${searchEngine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex++
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Finished links gatherers workers: ${sessionIndex} out of ${keywordsLength}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        ending()
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
                    for( i in links ){
                        comboLeecher.links.push(links[i])
                    }
                }

                if(sessionIndex == keywordsLength){
                    ending()
                    return
                }
            })
        }else if(searchEngine == "https://www.ask.com/web?q="){
            Request(`${searchEngine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Finished links gatherers workers: ${sessionIndex} out of ${keywordsLength}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        ending()
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
                    for( i in links ){
                        comboLeecher.links.push(links[i])
                    }
                }

                if(sessionIndex == keywordsLength){
                    ending()
                    return
                }
            })
        }else if(searchEngine == "https://duckduckgo.com/?num=100&q="){
            Request(`${searchEngine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Finished links gatherers workers: ${sessionIndex} out of ${keywordsLength}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        ending()
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
                    for( i in links ){
                        comboLeecher.links.push(links[i])
                    }
                }

                if(sessionIndex == keywordsLength){
                    ending()
                    return
                }
            })
        }else if(searchEngine == "https://www.bing.com/search?num=100&q="){
            Request(`${searchEngine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Finished links gatherers workers: ${sessionIndex} out of ${keywordsLength}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        ending()
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
                    for( i in links ){
                        comboLeecher.links.push(links[i])
                    }
                }

                if(sessionIndex == keywordsLength){
                    ending()
                    return
                }
            })
        }else if(searchEngine == "https://search.yahoo.com/search?q="){
            Request(`${searchEngine}site:pastebin.com intext:${keyword}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                sessionIndex += 1
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Finished links gatherers workers: ${sessionIndex} out of ${keywordsLength}`)

                if(err){
                    if(sessionIndex == keywordsLength){
                        ending()
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
                    for( const link of links ) comboLeecher.links.push(link)
                }

                if(sessionIndex == keywordsLength) return ending()
            })
        }
    }

    function ending(){
        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Links gatherers are finished.")

        var links_length = comboLeecher.links.length
        var link_index = 0

        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Emails and passwords leeching has started.")
        for( i in comboLeecher.links ){
            if(comboLeecher.links[i] != ""){
                gather_emails_and_passwords(comboLeecher.links[i])
            }else{
                link_index -= 1
            }
        }
        
        function gather_emails_and_passwords(link){
            Request(link, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
                },
                timeout: 5000
            }, function(err, res, body){
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", `Finished emails and passwords leechers workers: ${link_index} out of ${links_length}`)

                if(err){
                    link_index++
                    console.log(link_index)
                    console.log(links_length)
                    if(link_index == links_length){
                        saveResults()
                        return
                    }
                    
                    return
                }

                const emails_and_passwords = body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)

                if(typeof(emails_and_passwords) == "object"){
                    for( i in emails_and_passwords ){
                        if(comboLeecher.results.indexOf(emails_and_passwords[i]) == -1){
                            if(comboLeecher.results.length == 0){
                                comboLeecher.results = emails_and_passwords[i]
                            }else{
                                comboLeecher.results += `\n${emails_and_passwords[i]}`
                            }
                        }
                    }
                }

                link_index++

                if(link_index == links_length) return saveResults()

                return
            })
        }

        function saveResults(){
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Combo Leecher is finished.")
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Checking if there are any emails and passwords that is gathered.")

            if(comboLeecher.results.length == 0){
                I2rys.log("bloody", "WARN", "LazyLeech Debugger:", "It looks like there are no emails and passwords found.")
                callback()
                return
            }else{
                I2rys.log("bloody", "WARN", "LazyLeech Debugger:", `${comboLeecher.results.split("\n").length} emails and passwords found.`)
                const randomNumbers = Math.floor(Math.random() * 999999999999)

                Fs.writeFileSync(`${outputDir}/${randomNumbers}.txt`, comboLeecher.results, "utf8")
                I2rys.log("bloody", "WARN", "LazyLeech Debugger:", `The results have been saved to ${outputDir}/${random_numbers}.txt`)

                callback()
                return
            }

            return
        }
    }
}

module.exports = plugin