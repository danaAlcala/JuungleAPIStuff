var numberOfPONYSold = PONY.nfts.length;

function totalPONYcost()
{
    let i;
    let totalSatoshis = 0;
    for (i=0; i < numberOfPONYSold; i++)
    {
        totalSatoshis += PONY.nfts[i].priceSatoshis;
    }
    return totalSatoshis;
}
function medianPONYcost()
{
    let newArray = [];
    let i;
    for (i=0; i < numberOfPONYSold; i++)
    {
        newArray.push(PONY.nfts[i].priceSatoshis);
    }
    newArray.sort((a, b) => a - b);
    for (i=0; i < newArray.length; i++)
    {
        console.log(newArray[i]);
    }
    if (newArray.length % 2 === 0)
    {
        let halfIndex = newArray.length / 2;
        return (newArray[halfIndex] + newArray[halfIndex + 1]) / 2;
    }
    else
    {
        let halfIndex = newArray.length / 2;
        return newArray[Math.floor(halfIndex) + 1];
    }
}
function printAllPrices()
{
    let i;
    for (i=0; i < numberOfPONYSold; i++)
    {
        console.log(PONY.nfts[i].priceSatoshis);
    }
}

var averageSatoshiPerSale = totalPONYcost() / numberOfPONYSold;

console.log(numberOfPONYSold + " PONY have sold to date");
console.log(totalPONYcost() + " satoshis have been earned so far.");
console.log("The average price per PONY has so far been " + averageSatoshiPerSale.toString() + " satoshis.");
console.log("The median price per PONY has so far been " + medianPONYcost() + " satoshis.");
//printAllPrices();