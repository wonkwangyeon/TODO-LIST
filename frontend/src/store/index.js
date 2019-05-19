import Vue from "vue";
import Vuex from "vuex";
import constants from "../constants";
import axios from "axios";
import InvalidRequestError from "../constants/error/InvalidRequestError";
import RequestTimeOut from "../constants/error/RequestTimeOut";
import BadRequestError from "../constants/error/BadRequestError";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000
});
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    todoList: [], //할 일 목록
    currentTodo: {} //할일에 대한 상세한 내용
  },
  getters: {
    getTodoList(state) {
      return state.todoList;
    },
    getCurrentTodo(state) {
      return state.currentTodo;
    }
  },
  mutations: {
    setCurrentTodo(state, payload) {
      state.currentTodo = payload;
    },
    addTodoList(state, payload) {
      if (Array.isArray(payload)) {
        payload.forEach(function(element) {
          state.todoList.push(element);
        });
      } else {
        return state.todoList.push(payload);
      }
    },
    setTodoList(state, payload) {
      // Todo list 를 통째로 교체하기 위한 mutation
      return (state.todoList = payload);
    },
    deleteTodo(state, payload) {
      // payload is todo Id
      let todolist = state.todoList;
      state.todoList = todolist.filter(function(element) {
        return element.id !== payload;
      });
      state.currentTodo = {};
      return;
    },
    modifyTodo(state, payload) {
      let todolist = state.todoList;
      state.todoList = todolist.map(function(element) {
        if (element.id === payload.id) {
          return payload;
        } else {
          return element;
        }
      });
      state.currentTodo = payload;
      return;
    }
  },
  actions: {
    //모든 할 일 목록을 get
    async getAllTodoList(context) {
      try {
        context.state.todoList = [];
        const { data } = await request.get(constants.api.endpoint);
        if (data.length > 0) {
          context.commit("addTodoList", data);
        }
      } catch (e) {
        if (typeof e.response === "undefined") {
          throw new RequestTimeOut({ data: new RequestTimeOut() });
        } else {
          throw new InvalidRequestError(e.response);
        }
      }
    },
    //낱개의 할일을 삭제
    async deleteTodo(context, todoId) {
      try {
        const { status } = await request.delete(constants.api.endpoint, {
          params: { id: todoId }
        });
        if (status === 200) {
          context.commit("deleteTodo", todoId);
        }
      } catch (e) {
        if (typeof e.response === "undefined") {
          throw new RequestTimeOut({ data: new RequestTimeOut() });
        } else {
          throw new InvalidRequestError(e.response);
        }
      }
    },
    async setTodo(context, toDo) {
      // toDo = To do 객체
      try {
        const { status } = await request.post(constants.api.endpoint, toDo);
        if (status === 200) {
          return context.commit("addTodoList", toDo);
        }
      } catch (e) {
        if (typeof e.response === "undefined") {
          throw new RequestTimeOut({ data: new RequestTimeOut() });
        } else {
          if (e.response.status === 400) {
            throw new BadRequestError(e.response);
          } else {
            throw new InvalidRequestError(e.response);
          }
        }
      }
    },
    async modifyTodo(context, toDo) {
      try {
        const { status } = await request.put(constants.api.endpoint, toDo);
        if (status === 200) {
          return context.commit("modifyTodo", toDo);
        }
      } catch (e) {
        if (typeof e.response === "undefined") {
          throw new RequestTimeOut({ data: new RequestTimeOut() });
        } else {
          if (e.response.status === 400) {
            throw new BadRequestError(e.response);
          } else {
            throw new InvalidRequestError(e.response);
          }
        }
      }
    },
    async modifyPriority(context, newOrder) {
      //우선순위 정렬
      try {
        const { status } = await request.put(constants.api.endpoint, newOrder);
        if (status === 200) {
          return context.commit("setTodoList", newOrder);
        }
      } catch (e) {
        if (typeof e.response === "undefined") {
          throw new RequestTimeOut({ data: new RequestTimeOut() });
        } else {
          throw new InvalidRequestError(e.response);
        }
      }
    }
  }
});
export default store;
