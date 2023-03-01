import { jsonBadRquestResponse, jsonInternalServerErrorResponse, jsonNotFoundResponse, jsonSuccessResponse } from "../service/httpResponse";
import  invoiceData from '../database/data/invoice';

const getInvoiceDue = async (request, response) => {
  try {
    const companyId = request.params.companyId;

    if (isNaN(parseFloat(companyId))) return jsonBadRquestResponse(response, 'Bad Request');

    const invoiceDue = await invoiceData.getInvoiceDueByCompanyId(companyId);
    if (invoiceDue.length === 0) {
      return jsonNotFoundResponse(response, 'invoice not found')
    }
    const data = {
        invoiceDue: invoiceDue[0]
    }
    return jsonSuccessResponse(response, data);
  } catch (err) {
    return jsonInternalServerErrorResponse(response, err as Error)
  }
};

export default {
  getInvoiceDue
};
