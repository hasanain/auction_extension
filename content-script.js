function getBuyersPremium(bid) {
  if (bid < 0) {
    return 0;
  }
  if (bid < 1000) {
    return 99;
  }
  if (bid < 1500) {
    return 199;
  }
  if (bid < 2000) {
    return 299;
  }
  if (bid < 3000) {
    return 399;
  }
  if (bid < 4000) {
    return 499;
  }
  if (bid < 5000) {
    return 599;
  }
  if (bid < 6000) {
    return 699;
  }
  return bid * 0.12;
}

function getOnlineAuctionFee(bid) {
  const fee = bid * 0.02;
  return fee > 50 ? fee : 50;
}

function getTax(amount) {
  return amount * 0.086;
}

const PASSENGER_VEHICLE_AUCTION_FEE = 149

function getActualPrice(bid) {
  const price = bid + getBuyersPremium(bid) + getOnlineAuctionFee(bid) + PASSENGER_VEHICLE_AUCTION_FEE;
  const taxes = getTax(price);
  return bid === 0 ? 0 : price + taxes;
}

function getBidFromFormattedNumber(formattedNumber) {
  console.log(formattedNumber)
  return Number((formattedNumber || "0.00").replace(/[^0-9.]/gi, ""));
}
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function getActualPriceNode(prefix, bid) { 
  const actualPrice = getActualPrice(bid)
  const node = document.createElement("div");
  node.classList.add('.unique-class')
  node.appendChild(
    document.createTextNode(`${prefix}: ${formatter.format(actualPrice)}`)
  );
  return node;
}
const showBidAmount = () => {
  const currentBid = document.querySelector('.currentBid .bidAmt')
  const bid = getBidFromFormattedNumber(currentBid.innerHTML)
  document.querySelector('.bidActions').appendChild(getActualPriceNode('Actual price', bid))
  const bidIncrement = getBidFromFormattedNumber(document.querySelector('#bidIncrement span').innerHTML.match(/\$[0-9,.]+/)[0])
  document.querySelector('.bidActions').appendChild(getActualPriceNode(`Next Bid (${bid + bidIncrement}) Price`, bid + bidIncrement))

}
setTimeout(showBidAmount)

setInterval(showBidAmount, 500)
