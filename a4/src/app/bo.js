const axios = require('axios').default;
const moment = require('moment');
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36";
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
 // Database Name
const dbName = 'stockdb';
var querystring = require('querystring');

const proxy = {ip: '95.168.185.183', port: '8080'}
// const proxy = {ip: '23.229.0.242', post: '80'}

let mainLoop = ()=>{
    let count = 0;
 
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);

        db.collection('companies')
        .find({})
        .toArray(async function(err, comps) {
            for await(let comp of comps){
                // process.stdout.write(comp.symbol + '   ')
                await getData(comp.symbol).then(async (data)=>{
                    // console.log(data);
                    for await (item of data){
                        let shortItem = {
                            symbol: comp.symbol,
                            exchange: comp.exchange,
                            shortId: item.id,
                            issueName: item.issue_name,
                            issueMarket: item.market,
                            netChange: item.net_change,
                            totalShorts: item.number_of_shares,
                            timestamp: item.timestamp,
                            
                        }
                        await db.collection('shorts').replaceOne({
                                symbol: shortItem.symbol,
                                exchange: shortItem.exchange,
                                shortId: shortItem.shortId,
                            }, shortItem,{ upsert : true });
                        count++;
                    }
                    
                    console.log(comp.symbol + ' has ' + data.length + ' short history ' + count)
                }).catch(()=>{
                    console.log(comp.symbol + ' failed!')
                })
            }
            
        });
        console.log(count)
        // client.close();
    });

    

}

let getNum = (numString)=>{
    return parseFloat(numString.replace(',','').replace(',','').replace(',','').replace(',',''))
}

let getData = async (symbol)=>{
    const config = {
        // headers: {
        //     Accept: '*/*',
        //     Origin: 'https://ceo.ca',
        //     Referer: 'https://ceo.ca/',
        //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //     "Sec-Fetch-Site": "same-origin",
        //     'Sec-Fetch-Mode': 'cors',
        //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        // },
        proxy: { host: proxy.ip, port: proxy.port }
    }
    // console.log(querystring.stringify({ query: symbol }))
    return axios
      .post('https://ceo.ca/api/search_suggestions/',  querystring.stringify({ query: symbol }))
      .then(async (res) => {
            // console.log(res.data.tags[0].symbol);
            // if(res.data.positions.length === 0){
                return axios
                    .get('https://ceo.ca/api/short_positions/one?symbol=' + res.data.tags[0].symbol, {
                    // jar: cookieJar, // tough.CookieJar or boolean
                    withCredentials: false, // If true, send cookie stored in jar
                    }, config)
                    .then(async (res1) => {
                        // console.log(res1.data);
                        return res1.data.positions;
                
                    })
            // }
            // return res.data.positions;
    
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        //return null;
      })
    
}

mainLoop();