"use strict";

// Dependencies
const readLine = require("readline-sync")
const I2rys = require("./utils/i2rys")
const dialogy = require("dialogy")
const chalk = require("chalk")
const fs = require("fs")

// Variables
var LazyLeech = {
    plugins: {
        checking: fs.readdirSync("./plugins/checking"),
        tools: fs.readdirSync("./plugins/tools")
    },
    loaded: {
        checking: [],
        tools: []
    }
}

if(!LazyLeech.plugins.checking.length){
    I2rys.log("bloody", "CRITICAL", "LazyLeech Debugger:", "No checking plugins detected.")
    return I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Exiting...")
}
  
if(!LazyLeech.plugins.tools.length){
    I2rys.log("bloody", "CRITICAL", "LazyLeech Debugger:", "No tools plugins detected.")
    return I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Exiting...")
}

for( const plugin in LazyLeech.plugins.checking ){
    const settings = require(`./plugins/checking/${LazyLeech.plugins.checking[plugin]}/settings.json`)

    LazyLeech.loaded.checking.push({ index: +plugin+1, name: settings.name, description: settings.description })
}

for( const plugin in LazyLeech.plugins.tools ){
    const settings = require(`./plugins/tools/${LazyLeech.plugins.tools[plugin]}/settings.json`)

    LazyLeech.loaded.tools.push({ index: +plugin+1, name: settings.name, description: settings.description })
}

// Functions
LazyLeech.navigation = function(){
    console.clear()
    console.log(chalk.redBright(`
            ██╗      █████╗ ███████╗██╗   ██╗██╗     ███████╗███████╗ ██████╗██╗  ██╗
            ██║     ██╔══██╗╚══███╔╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝██╔════╝██║  ██║
            ██║     ███████║  ███╔╝  ╚████╔╝ ██║     █████╗  █████╗  ██║     ███████║
            ██║     ██╔══██║ ███╔╝    ╚██╔╝  ██║     ██╔══╝  ██╔══╝  ██║     ██╔══██║
            ███████╗██║  ██║███████╗   ██║   ███████╗███████╗███████╗╚██████╗██║  ██║
            ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝
                            - Developed by I2rys
                            - Assisted by cutieQue
    `))
    console.log(chalk.yellowBright(`
    1) Checking
    2) Tools
    3) Credits
    4) Exit`))

    console.log()
    var option = readLine.question(`${chalk.redBright("lazyleech")}: `)

    if(option == 1){
        console.clear()
        console.log(chalk.redBright(`
        ██╗      █████╗ ███████╗██╗   ██╗██╗     ███████╗███████╗ ██████╗██╗  ██╗
        ██║     ██╔══██╗╚══███╔╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝██╔════╝██║  ██║
        ██║     ███████║  ███╔╝  ╚████╔╝ ██║     █████╗  █████╗  ██║     ███████║
        ██║     ██╔══██║ ███╔╝    ╚██╔╝  ██║     ██╔══╝  ██╔══╝  ██║     ██╔══██║
        ███████╗██║  ██║███████╗   ██║   ███████╗███████╗███████╗╚██████╗██║  ██║
        ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝
                        - Developed by I2rys
                        - Assisted by cutieQue
        `))

        for( const plugin of LazyLeech.loaded.checking ) console.log(chalk.yellowBright(`${plugin.index}) ${plugin.name} | ${plugin.description}`))

        console.log(chalk.red("97) Use all modules"))
        console.log(chalk.red("98) Go back to the menu"))
        console.log(chalk.red("99) Exit"))

        option = readLine.question(`${chalk.redBright("lazyleech/checking")}: `)

        if(option == 97){
            console.log()
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
  
            const randomNumbers = Math.floor(Math.random() * 999999999999)

            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Keep this in mind, LazyLeech doesn't have a feature to detect if all the modules are finished.")
            setTimeout(()=>{
                for( var plugin of LazyLeech.plugins.checking){
                    plugin = require(`./plugins/checking/${plugin}/index.js`)
                    plugin = new plugin()

                    plugin.multiple(`${__dirname}/results/${randomNumbers}`, combo, proxies, function(callback){})
                }
            }, 6000)
            return
        }else if(option == 98){
            console.log()
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
            setTimeout(()=>{    
              console.clear()
              LazyLeech.navigation()
            }, 2000)
            return
        }else if(option == 99){
            console.log()
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Exiting...")
            setInterval(function(){
              console.clear()
              process.exit()
            }, 2000)
            return
        }

        var validOption = false
        var checkingPluginIndex = 0

        for( let i = 0; i <= LazyLeech.plugins.checking.length; i++ ){
            if(option == i+1){
                validOption = true
                checkingPluginIndex = i
            }
        }

        if(validOption){
            var plugin = require(`./plugins/checking/${LazyLeech.plugins.checking[option-1]}/index.js`)
            plugin = new plugin()

            plugin.single(__dirname, function(callback){
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
                setTimeout(()=>{    
                    console.clear()
                    LazyLeech.navigation()
                }, 6000)
            })
          }else{
            console.log()
            I2rys.log("bloody", "ERROR", "LazyLeech Debugger:", "Invalid option.")
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
            setTimeout(()=>{ 
                console.clear()
                LazyLeech.navigation()
            }, 2000)
        }
    }else if(option == 2){
        console.clear()
        console.log(chalk.redBright(`
        ██╗      █████╗ ███████╗██╗   ██╗██╗     ███████╗███████╗ ██████╗██╗  ██╗
        ██║     ██╔══██╗╚══███╔╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝██╔════╝██║  ██║
        ██║     ███████║  ███╔╝  ╚████╔╝ ██║     █████╗  █████╗  ██║     ███████║
        ██║     ██╔══██║ ███╔╝    ╚██╔╝  ██║     ██╔══╝  ██╔══╝  ██║     ██╔══██║
        ███████╗██║  ██║███████╗   ██║   ███████╗███████╗███████╗╚██████╗██║  ██║
        ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝
                        - Developed by I2rys
                        - Assisted by cutieQue
        `))

        for( const plugin of LazyLeech.loaded.tools ) console.log(chalk.yellowBright(`${plugin.index}) ${plugin.name} | ${plugin.description}`))
    
        console.log()
        console.log(chalk.red("98) Go back to the menu"))
        console.log(chalk.red("99) Exit"))

        option = readLine.question(`${chalk.redBright("lazyleech/tools")}: `)

        if(option == 98){
            console.log()
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
            return setTimeout(()=>{    
                console.clear()
                LazyLeech.navigation()
            }, 2000)
        }else if(option == 99){
            console.log()
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Exiting...")
            return setInterval(function(){
                console.clear()
                process.exit()
            }, 2000)
        }

        var validOption = false

        for( let i = 0; i <= LazyLeech.plugins.checking.length+1; i++ ){
            if(option == i+1){
                validOption = true
            }
        }

        if(validOption){
            require(`./plugins/tools/${LazyLeech.plugins.tools[option-1]}/index.js`)(__dirname, function(callback){
                I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
                setTimeout(()=>{    
                    console.clear()
                    LazyLeech.navigation()
                }, 6000)
            })
          }else{
            console.log()
            I2rys.log("bloody", "ERROR", "LazyLeech Debugger:", "Invalid option.")
            I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
            setTimeout(()=>{ 
                console.clear()
                LazyLeech.navigation()
            }, 2000)
        }
    }else if(option == 3){
        console.log()
        console.log(`${chalk.red(`+ --------- Hall of Developers ---------- +
    Developer: I2rys
    Co Developer: cutieQue
+ --------------------------------------- +`)}`)

        console.log()
        readLine.question("Press enter to go back to the menu: ")
        console.clear()
        return LazyLeech.navigation()
    }else if(option == 4){
        console.log("")
        I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Exiting...")
        return setInterval(()=>{
            console.clear()
            process.exit()
        }, 2000)
    }else{
        console.log("")
        I2rys.log("bloody", "ERROR", "LazyLeech Debugger:", "Invalid option.")
        setTimeout(()=>{
          I2rys.log("bloody", "INFO", "LazyLeech Debugger:", "Going back to the menu.")
          console.clear()
          LazyLeech.navigation()
        }, 2000)
    }
}

// Main
LazyLeech.navigation()