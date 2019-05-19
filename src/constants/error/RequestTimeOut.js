function RequestTimeOut(message) {
    this.name = "RequestTimeOut";
    this.code = 408;
    this.message = message || "서버와의 연결이 원활하지 않습니다. 잠시후에 사용해 주세요";
}
RequestTimeOut.prototype = new Error();
RequestTimeOut.prototype.constructor = RequestTimeOut;

module.exports = RequestTimeOut;
