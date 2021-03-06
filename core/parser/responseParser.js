const appUtils = require('../util/appUtils')

exports.apiResponseToFormattedLogObject = (apiResponse) =>{

    if(appUtils.currentActiveExchange() === "binance"){
            // parse API Response from Binance.
        return binanceParser(apiResponse);
    } else if (appUtils.currentActiveExchange() === "deribit") {
        // parse API Response from Deribit.
        return deribitParser(apiResponse)
    }
    console.log("Returning NULL response for logging..")
    return null;
    
}


const binanceParser = response => {
    const respObj = {
        symbol : "BTC-USD",
        price: response.data[0].price,
        qty: response.data[0].qty,
        ts: response.data[0].time
    }
    return respObj;
}

const deribitParser = response =>{

    const responseSymbol = getDeribitTicker(response.data.result.instrument_name);

    const respObj = {
        symbol: responseSymbol,
        price: response.data.result.index_price,
        qty: 1,
        ts : response.data.result.timestamp

    }
    return respObj;
}

const getDeribitTicker = instrument_name => {
    return instrument_name + "-USD";
}
