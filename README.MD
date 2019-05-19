# 2019 Programmers Summer Coding Internship Todo-List Assignment
![introduce](./description/introduce.PNG)

## 1. 소개
2019 Programmers Summer Coding Internship Todo-List 과제입니다.

접속 주소: https://2019-programmers-todo.wky.kr

## 2. 프로젝트 구조
프로젝트 구조는 크게 Back-End, Front-End로 나누어져 있습니다.

+ [Back-End](https://github.com/WonKwangYeon/Programmers-Summer-Internship-Assginment/tree/master/backend)  
1. 개발 환경은 Node.JS(Express) + Sqlite3 입니다.
2. 서버 배포는 Heroku를 이용하였습니다.
+ [Front-End](https://github.com/WonKwangYeon/Programmers-Summer-Internship-Assginment/tree/master/frontend)  
1. 개발 환경은 Vue.JS + Vue BootStrap 입니다.  
2. 배포는 AWS S3 + Cloud Front 를 이용하였습니다.

## 3. 프로젝트 기능
+ Todo 작성
+ Todo 목록 조회
+ Todo 수정(마감기한 설정 및 간단한 메모 작성)
+ Todo 삭제
+ Todo 우선순위 설정
+ Todo 완료처리
+ Todo 마감기한 노출

## 4. 설치 및 빌드방법
**본 프로젝트에서는 Node.JS 의 버전을 10.14.2 를 사용하고 있습니다.** 

따라서 nvm을 사용하여 v10.14.2 를 우선 설치하여 사용하도록 설정이 필요합니다.

### 4-1. nvm 설치

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
source .bash_profile && nvm install v10.14.2 && nvm use v10.14.2
```

### 4-2. 프로젝트 clone
```
git clone https://github.com/WonKwangYeon/Programmers-Summer-Internship-Assginment.git
```
이후 각각의 프로젝트 실행 순서는 아래의 링크를 통해 진행해주세요.
> Back-End 먼저 설치/실행 후 Front-End를 설치/실행하시는 것을 권장드립니다.
+ [Back-End](https://github.com/WonKwangYeon/Programmers-Summer-Internship-Assginment/tree/master/backend)  
+ [Front-End](https://github.com/WonKwangYeon/Programmers-Summer-Internship-Assginment/tree/master/frontend)  
