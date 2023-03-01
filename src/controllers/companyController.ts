import { jsonBadRquestResponse, jsonInternalServerErrorResponse, jsonNotFoundResponse, jsonSuccessResponse } from "../service/httpResponse";
import  companyData from '../database/data/company';

const getCompany = async (request, response) => {
  try {
    const { id } = request.params as { id: string };
    if (isNaN(parseFloat(id))) return jsonBadRquestResponse(response, 'Bad Request');

    const company = await companyData.getCompanyById(id);
    if (company.length === 0) {
      return jsonNotFoundResponse(response, 'Company not found');
    }

    return jsonSuccessResponse(response, company[0]);
  } catch (err) {
    return jsonInternalServerErrorResponse(response, err as Error);
  }
};

export default {
  getCompany
};

