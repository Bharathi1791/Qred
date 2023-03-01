export const jsonSuccessResponse = (response, data: object) => {
  response.status(200).json({
    data,
  });
}

export  const jsonBadRquestResponse = (response, message: string) => {
  response.status(400).json({
    message,
  });
}

export  const jsonNotFoundResponse = (response, message: string) => {
  response.status(404).json({
    message,
  });
}

  export  const jsonInternalServerErrorResponse = (response, err: Error) => {
    response.status(500).json({
      err,
    });
  }
