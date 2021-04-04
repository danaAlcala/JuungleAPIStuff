const BCHSATOSHIS = 100000000;
const COINGECKO = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd";

var receivedJSONdata;
var NFTs;
var tokenID = "88dac34fd486cdca5d011c0eed7cae661ebc1bd16df949a6b6e22226de44a024";
var jsonurl = "https://www.juungle.net/api/v1/nfts?groupTokenId=" + tokenID + "&priceSatoshisSet=true&purchaseTxidUnset=true";
var soldTokens = [];
var BCHtoUSD = 0;

function satoshisToBCH(paramSatoshis)
{
    return paramSatoshis / BCHSATOSHIS;
}

function BCHtoUSDollars(paramBCH)
{
    return paramBCH * BCHtoUSD;
}

function getUSDPrice()
{
    $.getJSON(COINGECKO, function(data)
    {
        let BCHtoUSDdata = data;
        let strBCHtoUSD = JSON.stringify(BCHtoUSDdata)
        console.log(strBCHtoUSD);
        console.log(BCHtoUSDdata["bitcoin-cash"]["usd"]);
        BCHtoUSD = BCHtoUSDdata["bitcoin-cash"]["usd"]
    })
}

function getNFTData(paramURL)
{
    $.getJSON(paramURL,function(data)
    {
        receivedJSONdata = data;
        NFTs = receivedJSONdata.nfts;
        let i;
        for (i=0; i< NFTs.length; i++)
        {
            let tokenName = NFTs[i].tokenName;
            let tokenPrice = satoshisToBCH(NFTs[i].priceSatoshis).toString();
            let tokenUSD = BCHtoUSDollars(tokenPrice).toFixed(2);
            console.log(tokenName + ": " + tokenPrice + " BCH $" + tokenUSD);
            if (NFTs[i].userId !== 296)
            {
                soldTokens.push(NFTs[i]);
            }
        }
        console.log(soldTokens);
    }
    );
}

function getData(paramURL)
{
    getUSDPrice();
    getNFTData(paramURL);    
}

//getData(jsonurl);