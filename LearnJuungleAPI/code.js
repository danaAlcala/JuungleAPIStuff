const BCHSATOSHIS = 100000000;

//API URL Params for NFTs
const AVAILABLE = "&priceSatoshisSet=true";
const NOTPURCHASED = "&purchaseTxidUnset=true";

const COINGECKO = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd";

var tokenIDs =
{
    "PHOTOYSHOP": "88dac34fd486cdca5d011c0eed7cae661ebc1bd16df949a6b6e22226de44a024",
    "JLV": "0ece7b7a27bd62bf2abecede838321cb65842cbb0ae1398d51d77d264338698d",
    "lucivay": "454f7411a1a5a1af8e310b478fa8deae24fa4d321c499a11229c16085d1b0553"
};
var receivedJSONdata;
var NFTs;
var tokenID = tokenIDs.PHOTOYSHOP;
var jsonurl = "https://www.juungle.net/api/v1/nfts?groupTokenId=" + tokenID + AVAILABLE + NOTPURCHASED;
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
        let dataButton = document.getElementById("Data");
        let bigMoney = document.getElementById("USD");
        console.log(strBCHtoUSD);
        console.log(BCHtoUSDdata["bitcoin-cash"]["usd"]);
        BCHtoUSD = BCHtoUSDdata["bitcoin-cash"]["usd"]
        bigMoney.innerHTML = "1 BCH = $" + BCHtoUSD.toString();
        dataButton.disabled = false;
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
    getNFTData(paramURL);    
}

function buildTable()
{    
    let rows = 0;
    let columns = 0;
    var table = document.getElementById("myTable");
    table.insertRow(1);
    table[1][0].innerHTML = "Hello";
}