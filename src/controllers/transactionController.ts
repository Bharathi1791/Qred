import { jsonBadRquestResponse, jsonInternalServerErrorResponse, jsonNotFoundResponse, jsonSuccessResponse } from "../service/httpResponse";
import  transactionData from '../database/data/transactions';

const getLatestTransactions = async (request, response) => {
  try {
    const companyId = request.params.companyId;
    const { limit } = request.query;

    if (isNaN(parseFloat(companyId)) || isNaN(parseFloat(limit))) return jsonBadRquestResponse(response, 'Bad Request');

    const transactions = await transactionData.getLastestTransactionsByLimt(companyId, limit);
    if (transactions.length === 0) {
      return jsonNotFoundResponse(response, 'transactions not found')
    }

    const transactionsCount = await transactionData.countTransactions(transactions[0].card_id);
    const remainingTransactionsCount = transactionsCount[0].count > limit ? transactionsCount[0].count - limit : 0;
    const data = {
      transactions,
      remainingTransactionsCount,
    }
    return jsonSuccessResponse(response, data);
  } catch (err) {
    return jsonInternalServerErrorResponse(response, err as Error)
  }
};

const getAllTransactions = async (request, response) => {
  try {
    const companyId = request.params.companyId;
    const { offset } = request.query;

    if (isNaN(parseFloat(companyId)) || isNaN(parseFloat(offset))) return jsonBadRquestResponse(response, 'Bad Request');

    const transactions = await transactionData.getAllTransactionsWithOffset(companyId, offset);
    if (transactions.length === 0) {
      return jsonNotFoundResponse(response, 'transactions not found')
    }
    const data = {
      transactions,
    }
    return jsonSuccessResponse(response, data);
  } catch (err) {
    return jsonInternalServerErrorResponse(response, err as Error)
  }
};

export default {
  getLatestTransactions,
  getAllTransactions
};
