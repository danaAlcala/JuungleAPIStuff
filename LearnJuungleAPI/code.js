const BCHSATOSHIS = 100000000;

//API URL Params for NFTs
const AVAILABLE = "&priceSatoshisSet=true";
const NOTPURCHASED = "&purchaseTxidUnset=true";
const MAINUSERID = "&userId=296";

const COINGECKO = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd";

var tokenIDs =
{
    "PHOTOYSHOP": "88dac34fd486cdca5d011c0eed7cae661ebc1bd16df949a6b6e22226de44a024",
    "JLV": "0ece7b7a27bd62bf2abecede838321cb65842cbb0ae1398d51d77d264338698d",
    "lucivay": "454f7411a1a5a1af8e310b478fa8deae24fa4d321c499a11229c16085d1b0553"
};

var currentUSDPrices =
{
    "PHOTOYSHOP": "105.00",
    "JLV": "155.00",
    "lucivay": "155.00"
}

var currentBCHPrices =
{
    "PHOTOYSHOP": "",
    "JLV": "",
    "lucivay": ""
}

var currentSATOSHIPrices =
{
    "PHOTOYSHOP": "",
    "JLV": "",
    "lucivay": ""
}

var receivedJSONdata;
var NFTs;
var tokenID = tokenIDs.PHOTOYSHOP;
var jsonurl = "https://www.juungle.net/api/v1/nfts?groupTokenId=" + tokenID + MAINUSERID + AVAILABLE + NOTPURCHASED;
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
        let preferredPrice = document.getElementById("PRICE");
        let newSatoshis = document.getElementById("SATOSHIS");
        console.log(strBCHtoUSD);
        console.log(BCHtoUSDdata["bitcoin-cash"]["usd"]);
        BCHtoUSD = BCHtoUSDdata["bitcoin-cash"]["usd"];
        currentBCHPrices.PHOTOYSHOP = (currentUSDPrices.PHOTOYSHOP / BCHtoUSD).toFixed(8);
        currentSATOSHIPrices.PHOTOYSHOP = currentBCHPrices.PHOTOYSHOP * BCHSATOSHIS;
        bigMoney.innerHTML = "1 BCH = $" + BCHtoUSD.toString();
        preferredPrice.innerHTML = "$" + currentUSDPrices.PHOTOYSHOP.toString() + " = " + currentBCHPrices.PHOTOYSHOP.toString() + " BCH";
        newSatoshis.innerHTML = "$" + currentUSDPrices.PHOTOYSHOP.toString() + " = " + currentSATOSHIPrices.PHOTOYSHOP.toString() + " Satoshis";
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
        for (i=NFTs.length-1; i > 0; i--)
        {
            let tokenName = NFTs[i].tokenName;
            let NFTID = NFTs[i].id;
            let tokenPrice = satoshisToBCH(NFTs[i].priceSatoshis).toString();
            let tokenUSD = BCHtoUSDollars(tokenPrice).toFixed(2);
            //console.log(tokenName + ": " + tokenPrice + " BCH $" + tokenUSD);
            buildTable(NFTID, tokenName, tokenUSD);
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

function buildTable(c0, c1, c2)
{    
    var btn = document.createElement("button");
    btn.innerHTML = "Fix";
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    cell0.innerHTML = c0;
    cell1.innerHTML = c1;
    cell2.innerHTML = c2;
    cell3.innerHTML = "placeholder";    
}

function setPrice(paramID, paramPrice)
{
    $.ajax(
        {
            url: "https://www.juungle.net/api/v1/user/nfts/set_price",
            headers: '{"X-Access-Token": ' + jwt.toString() +'}',
            type: 'POST',
            contentType: "application/json",
            charset: "utf-8",
            datatype: 'json',
            data: '{"nftId": "'+paramID.toString() +'", "priceSatoshis": "' + paramPrice.toString() + '"}',
            success: function(data)
            {
                console.log(JSON.stringify(data));
            },
            error: function()
            {
                alert("Cannot set price.");
                console.log(paramID.toString() + " " + paramPrice.toString() + " " + jwt.toString());
            }
        })
}

function fixAllPrices()
{
    setPrice(4837, currentSATOSHIPrices.PHOTOYSHOP);
}