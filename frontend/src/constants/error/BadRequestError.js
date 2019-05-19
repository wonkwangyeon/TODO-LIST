function BadRequestError(message) {
    this.name = "BadRequestError";
    this.code = 400;
    this.message = message || "서버에 오류가 발생하여 요청을 수행할 수 없습니다.";
}
BadRequestError.prototype = new Error();
BadRequestError.prototype.constructor = BadRequestError;

module.exports = BadRequestError;