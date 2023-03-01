import { jsonBadRquestResponse, jsonInternalServerErrorResponse, jsonNotFoundResponse, jsonSuccessResponse } from "../service/httpResponse";
import  cardData from '../database/data/card';

const getRemainingSpend = async (request, response) => {
  try {
    const { companyId } = request.params as { companyId: string };
    if (isNaN(parseFloat(companyId))) return jsonBadRquestResponse(response, 'Bad Request');

    const card = await cardData.getCreditDetailByCompanyId(companyId);

    if (card.length === 0) {
      return jsonNotFoundResponse(response, 'Card not found')
    }
    return jsonSuccessResponse(response, card[0]);
  } catch (err) {
    return jsonInternalServerErrorResponse(response, err as Error)
  }
};

export default {
  getRemainingSpend
};

