//require package\
// import { a } from './CheckMacValue_function';
const Promise = require('bluebird');
const Window = require('window');
const CheckMacValue = require('./CheckMacValue');
const MerchantTradeNo = Window.MerchantTradeNo;
const MerchantTradeDate = Window.MerchantTradeDate;

//set routing issue//
const { Router } = require('express');
const pool = require('../db');
const router = Router();

router.get('/product/pay_off', (err, res) => {
  res.render('enter.ejs');
});

router.post('/product/pay_off', (request, response, next) => {
    const MerchantID = '2000132';
    const TotalAmount = request.body.TotalAmount;
    const ItemName = request.body.ItemName;
    const ChoosePayment = request.body.ChoosePayment;
    const PaymentType = 'aio';
    const TradeDesc = '建立信用卡測試訂單';
    const ReturnURL = 'https://www.facebook.com/';
    const EncryptType = '1';
    const realCheckMacValue = CheckMacValue.payoff_value(MerchantID, PaymentType,
                                                  TotalAmount, TradeDesc,
                                                  ItemName, ReturnURL,
                                                  ChoosePayment, EncryptType);
    const REQUIRED_INFO = {
      MerchantID: MerchantID,
      MerchantTradeNo: MerchantTradeNo,
      MerchantTradeDate: MerchantTradeDate,
      PaymentType: PaymentType,
      TotalAmount: TotalAmount,
      TradeDesc: TradeDesc,
      ItemName: ItemName,
      ReturnURL: ReturnURL,
      ChoosePayment: ChoosePayment,
      CheckMacValue: realCheckMacValue,
      EncryptType: EncryptType,
    };
    response.render('post.ejs', { REQUIRED_INFO: REQUIRED_INFO });
    console.log(REQUIRED_INFO);
  });

//part for the dollar cost averaging
router.get('/product/dollar_cost_averaging', (err, res) => {
  res.render('Dollar_cost_averaging.ejs');
});

router.post('/product/dollar_cost_averaging', (request, response, next) => {
          const MerchantID = '2000132';
          const TotalAmount = request.body.TotalAmount;
          const ItemName = request.body.ItemName;
          const ChoosePayment = request.body.ChoosePayment;
          const PaymentType = 'aio';
          const TradeDesc = '建立信用卡測試訂單';
          const ReturnURL = 'https://www.facebook.com/';
          const EncryptType = '1';
          const PeriodAmount = '1800';
          const PeriodType = 'M';
          const Frequency = '1';
          const ExecTimes = '6';
          const PeriodReturnURL = 'https://www.facebook.com/';
          const realCheckMacValue = CheckMacValue.average_value(MerchantID, PaymentType, TotalAmount, TradeDesc,
                                  ItemName, ReturnURL, ChoosePayment, EncryptType, PeriodAmount,
                                   PeriodType, Frequency, ExecTimes, PeriodReturnURL);
          const REQUIREDAVG_INFO = {
                  MerchantID: MerchantID,
                  MerchantTradeNo: MerchantTradeNo,
                  MerchantTradeDate: MerchantTradeDate,
                  PaymentType: PaymentType,
                  TotalAmount: TotalAmount,
                  TradeDesc: TradeDesc,
                  ItemName: ItemName,
                  ReturnURL: ReturnURL,
                  ChoosePayment: ChoosePayment,
                  CheckMacValue: realCheckMacValue,
                  EncryptType: EncryptType,
                  PeriodAmount: PeriodAmount,
                  PeriodType: PeriodType,
                  Frequency: Frequency,
                  ExecTimes: ExecTimes,
                  PeriodReturnURL: PeriodReturnURL,
                };
          console.log(REQUIREDAVG_INFO);
          response.render('postforaverage.ejs', { REQUIREDAVG_INFO: REQUIREDAVG_INFO });

        });

module.exports = router;
