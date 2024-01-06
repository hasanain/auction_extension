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
const getForm = () => {
  // Create the main container div with class "calculator-form"
  const calculatorFormDiv = document.createElement('div');
  calculatorFormDiv.className = 'calculator-form';

  // Create the nested div with class "extension-form"
  const extensionFormDiv = document.createElement('div');
  extensionFormDiv.className = 'extension-form';

  // Create the input element with type "text" and a placeholder
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.placeholder = 'input your bid amount';


  // Append the input element to the "extension-form" div
  extensionFormDiv.appendChild(inputElement);

  // Create the div with class "extension-bid-display"
  const extensionBidDisplayDiv = document.createElement('div');
  extensionBidDisplayDiv.className = 'extension-bid-display';
  extensionBidDisplayDiv.textContent = 'Calculated Bid Amount: ...';

  // Append the "extension-form" and "extension-bid-display" divs to the main container
  calculatorFormDiv.appendChild(extensionFormDiv);
  calculatorFormDiv.appendChild(extensionBidDisplayDiv);

  inputElement.addEventListener('input', function() {
    // Update the text content of the "extension-bid-display" div with the input field value
    extensionBidDisplayDiv.textContent = `Calculated Bid Amount: ${getActualPrice(Number(inputElement.value))}`;
  });
  return calculatorFormDiv
}
const showBidAmount = () => {
  const currentBid = document.querySelector('.currentBid .bidAmt')
  const bid = getBidFromFormattedNumber(currentBid.innerHTML)
  document.querySelector('.bidActions').appendChild(getActualPriceNode('Actual price', bid))
  const bidIncrement = getBidFromFormattedNumber(document.querySelector('#bidIncrement span').innerHTML.match(/\$[0-9,.]+/)[0])
  document.querySelector('.bidActions').appendChild(getActualPriceNode(`Next Bid (${bid + bidIncrement}) Price`, bid + bidIncrement))
  document.querySelector('.bidActions').appendChild(getForm())
}

setTimeout(showBidAmount, 500)
