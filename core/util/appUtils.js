const config = require('config');
const timestamp = require('time-stamp');

exports.currentActiveExchange = () => {
  return config.get('App.currentExchange');
}

exports.getApiUrlToConsume = () =>{
  if(config.get('App.currentExchange') === "binance"){
   console.log("Returning as binance..");
    console.log("API URL->", config.get('App.binance.trade_url_btc'))
    return config.get('App.binance.trade_url_btc');
  } else if (config.get('App.currentExchange') === "deribit") {
    console.log("Returning as deribit..");
    return config.get('App.deribit.ticker_url_eth_perpetual');
  }
  console.log("Unable find the active exchange..");
  return "";
}

exports.getFormattedTimeStamp = () => {
  var data = timestamp.utc('YYYY') + "-" + timestamp.utc('MM') + "-" + timestamp.utc('DD') + "-" +
    timestamp.utc('HH') + "-" + timestamp.utc('mm') + "-" + timestamp.utc('ss');
    return data;
}