function InvalidRequestError(message) {
    this.name = "InvalidRequestError";
    this.code = 500;
    this.message = message || "서버에 오류가 발생하여 요청을 수행할 수 없습니다.";
}
InvalidRequestError.prototype = new Error();
InvalidRequestError.prototype.constructor = InvalidRequestError;

module.exports = InvalidRequestError;
