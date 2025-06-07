export class configuration {
    responseVariables: any;
    responseHeaders: any;
    optMessage: any;
    emailMessage: any;
    emailSubject: any;
    constructor() {
      this.responseVariables = {
        success: {
          responseCode: configuration.responses.CODE_SUCCESS,
          responseMessage: configuration.responses.MESSAGE_SUCCESS,
          httpCode: 200,
        },
        success_resource_created: {
          responseCode: configuration.responses.CODE_CREATED_OK,
          responseMessage: configuration.responses.MESSAGE_SUCCESS,
          httpCode: 200,
        },
        success_verify_created: {
          responseCode: configuration.responses.CODE_VERIFY_OK,
          responseMessage: configuration.responses.MESSAGE_VERIFY_SUCCESS,
          httpCode: 203,
        },
        success_verify: {
          responseCode: configuration.responses.CODE_VERIFY,
          responseMessage: configuration.responses.MESSAGE_VERIFY,
          httpCode: 204,
        },
        success_callback: {
          responseCode: configuration.responses.CODE_SUCCESS_CALLBACK,
          responseMessage: configuration.responses.MESSAGE_SUCCESS,
          httpCode: 200,
        },
        success_otp: {
          responseCode: configuration.responses.CODE_SUCCESS,
          responseMessage: configuration.responses.MESSAGE_OTP_SUCCESS,
          httpCode: 200,
        },
        otp_expired: {
          responseCode: configuration.responses.CODE_EXPIRED,
          responseMessage: configuration.responses.MESSAGE_OTP_EXPIRED,
          httpCode: 200,
        },
        processing: {
          responseCode: configuration.responses.CODE_ACCEPTED,
          responseMessage: configuration.responses.MESSAGE_REQUEST_PROCESSING,
          httpCode: 202,
        },
        opt_sent: {
          responseCode: configuration.responses.CODE_SUCCESS,
          responseMessage: configuration.responses.MESSAGE_OTP_SENT,
          httpCode: 200,
        },
        failure: {
          responseCode: configuration.responses.CODE_ERROR_OCCURED,
          responseMessage:
            configuration.responses.MESSAGE_COULD_NOT_COMPLETE_REQUEST,
          httpCode: 500,
        },
        payment_failure: {
          responseCode: configuration.responses.CODE_ERROR_OCCURED,
          responseMessage: configuration.responses.MESSAGE_PAYMENT_FAILED,
          httpCode: 500,
        },
        failure_otp: {
          responseCode: configuration.responses.CODE_ERROR_OCCURED,
          responseMessage: configuration.responses.MESSAGE_OTP_INCORRECT,
          httpCode: 200,
        },
        not_found: {
          responseCode: configuration.responses.CODE_RESOURCE_NOT_FOUND,
          responseMessage: configuration.responses.MESSAGE_RESOURCE_NOT_FOUND,
          httpCode: 404,
        },
        error: {
          responseCode: configuration.responses.CODE_ERROR_OCCURED,
          responseMessage: configuration.responses.MESSAGE_ERROR_OCCURED,
          httpCode: 500,
        },
        bad_request: {
          responseCode: configuration.responses.CODE_BAD_REQUEST,
          responseMessage: configuration.responses.MESSAGE_BAD_REQUEST,
          httpCode: 400,
        },
        invalid_otp_message: {
          responseCode: configuration.responses.CODE_ERROR_OCCURED,
          responseMessage: configuration.responses.MESSAGE_INVALID_MESSAGE,
          httpCode: 500,
        },
       
      };
  
      this.responseHeaders = {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Origin': '*',
      };
      this.optMessage = 'Your payment verification OTP for ';
      this.emailMessage = 'Find attached a receipt for payment\n';
      this.emailSubject = 'TRANSACTION DETAILS ';
    }
  
    static responses = {
      CODE_SUCCESS_CALLBACK: '01',
      CODE_ERROR_OCCURED: 500,
      CODE_SUCCESS: 200,
      CODE_ACCEPTED: 202,
      CODE_CREATED_OK: 201,
      CODE_VERIFY_OK:203,
      CODE_VERIFY:204,
      CODE_DELETED_OK: 204,
      CODE_RESOURCE_NOT_FOUND: 404,
      CODE_BAD_REQUEST: 400,
      CODE_UNAUTHORIZED: 401,
      CODE_EXPIRED: 410,
      CODE_DUPLICATE: 422,
      CODE_CANNOT_VERIFY: 409,
      MESSAGE_SUCCESS: 'Success',
      MESSAGE_PAYMENT_SUCCESS: 'Payment completed successfully',
      MESSAGE_VERIFY_SUCCESS: 'Card verification',
      MESSAGE_VERIFY: 'Card verification successful',
      
      MESSAGE_OTP_SUCCESS: 'Otp verification has passed successfully',
      MESSAGE_REQUEST_PROCESSING: 'Request is being processed',
      MESSAGE_OTP_SENT: 'OTP sent',
      MESSAGE_RESOURCE_NOT_FOUND: 'Resource not found',
      MESSAGE_BAD_REQUEST:
        'An error occured. Kindly check your request parameters',
      MESSAGE_UNAUTHORIZED:
        'Vendor not authorized. Kindly ensure usage of valid credentials',
      MESSAGE_ERROR_OCCURED: 'An error occured. Please try again later.',
      MESSAGE_COULD_NOT_COMPLETE_REQUEST:
        'Could not complete request. Kindy try again later.',
      MESSAGE_COULD_NOT_COMPLETE_DUPLICATE_REQUEST:
        'Duplicate request. Kindly make sure you pass unique Transaction References.',
      MESSAGE_OTP_INCORRECT:
        'OTP is incorrect. Kindly make sure you have the correct phone the otp was sent to',
      MESSAGE_PAYMENT_FAILED: 'Payment has failed. Kindly try again later',
      MESSAGE_OTP_EXPIRED: 'OTP has expired. Kindly request for a new OTP.',
      MESSAGE_INVALID_MESSAGE: 'Number is invalid. kindly check your request',
    };
  }
  