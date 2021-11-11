const redis = require('redis');
const config = require('./config');


exports.clientTimeout = (target) => {
    return new Promise((resolve, reject) => {
        hostsMap = new Map(Object.entries(config.env))
        
        cli = redis.createClient({
            url: hostsMap.get(target),
            tls: true
        })

        cli.on('connect', () => {
            console.log("Connected to redis: " + target)
            cli.client('pause','20000',(err, res) =>{
                if(err){
                    console.log(`result: ${err}`);
                } else {
                    console.log(`result: ${res}`);                    
                }
            })                
            
            
           
           /* cli.send_command("keys",['key', '*'], (err, res) =>{
                if(err){
                    console.log(`result: ${err}`);
                } else {
                    console.log(`result: ${res}`);                    
                }
            })*/
            //const result = cli.clientTimeout(2000)
            //console.log(`result: ${result}`);
            cli.quit()
        })

        cli.on('error', (error) => {
            console.log(error)
            reject(error)
        })

        cli.on('end', (error) => {
            console.log("Closing redis connection for " + target)
            resolve(true)
        })
    })    
}