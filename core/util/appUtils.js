const config = require('config');
const timestamp = require('time-stamp');
const constants = require('../util/Constants')

exports.currentActiveExchange = () => {
  return config.get(constants.CONFIG_ENTRY_CURRENT_EXCHANGE);
}

exports.getApiUrlToConsume = () =>{
  if(config.get(constants.CONFIG_ENTRY_CURRENT_EXCHANGE) === "binance"){
   console.log("Returning as binance..");
    return config.get(constants.CONFIG_ENTRY_BINANCE_TRADE_BTC_URL);
  } else if (config.get(constants.CONFIG_ENTRY_CURRENT_EXCHANGE) === "deribit") {
    console.log("Returning as deribit..");
    return config.get(constants.CONFIG_ENTRY_DERIBIT_ETH_PERPETUAL_URL);
  }
  console.log("Unable find the active exchange..");
  return "";
}

exports.getFormattedTimeStamp = () => {
  var data = timestamp.utc('YYYY') + "-" + timestamp.utc('MM') + "-" + timestamp.utc('DD') + "-" +
    timestamp.utc('HH') + "-" + timestamp.utc('mm') + "-" + timestamp.utc('ss');
    return data;
}

exports.buildJSONObjectForLogging = (respObj) => {


  var formattedTS = this.getFormattedTimeStamp();

  const json = {
    timestamp: formattedTS,
    [respObj.symbol]: respObj.price
  }

  return json;

}
