const a = 100;
const Window = require('window');
const sha256 = require('js-sha256');
const randomstring = require('randomstring');
const fs = require('fs');
const datetimefunction = require('date-time');
const datetime = datetimefunction().replace(/-/g, '/');
const random = randomstring.generate().substring(0, 20);
Window.MerchantTradeNo = random;
Window.MerchantTradeDate = datetime;

exports.value = function (MerchantID, PaymentType, TotalAmount, TradeDesc,
                          ItemName, ReturnURL, ChoosePayment, EncryptType) {
  const input = [
    { key: 'MerchantID', value: MerchantID },
    { key: 'MerchantTradeNo', value: random },
    { key: 'MerchantTradeDate', value: datetime },
    { key: 'PaymentType', value: PaymentType },
    { key: 'TotalAmount', value: TotalAmount },
    { key: 'TradeDesc', value: TradeDesc },
    { key: 'ItemName', value: ItemName },
    { key: 'ReturnURL', value: ReturnURL },
    { key: 'ChoosePayment', value: ChoosePayment },
    { key: 'EncryptType', value: EncryptType },
  ];

  const orderbyalpha = input.sort((a, b) => {
    var nameA = a.key.toUpperCase(); // ignore upper and lowercase
    var nameB = b.key.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }else if (nameA > nameB) {
      return 1;
    }else
    return 0;
  });
  const reformattedorderbyalpha = orderbyalpha.map((m) => {
      let Obj = [];
      Obj.push(m.key + '=' + m.value);
      return Obj;
    });
  const result = reformattedorderbyalpha.join('&');
  const head = 'HashKey=5294y06JbISpM5x9';
  const tail = 'HashIV=v77hoKGq4kWxNNIS';
  const final = head + '&' + result + '&' + tail;
  const res = encodeURIComponent(final);
  const revisedres = res.replace(/%20/g, '+');
  const lowertherevise = revisedres.toLowerCase();
  const SHAvalue = sha256(lowertherevise);
  const UpperSHA = SHAvalue.toUpperCase();

  return UpperSHA;
};
