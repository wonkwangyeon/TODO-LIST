import Vue from 'vue'
import Vuex from 'vuex'
import constants from '../constants'
import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 2000
})
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        todoList: [],
        currentTodo: {}
    },
    getters: {
        getTodoList: function(state) {
            return state.todoList;
        },
        getCurrentTodo: function(state) {
            return state.currentTodo;
        }
    },
    mutations: {
        setCurrentTodo: function(state, payload) {
            state.currentTodo = payload;
        },
        clearTodoList: function(state) {
            state.todoList = [];
        },
        addTodoList: function(state, payload) {
            if (Array.isArray(payload)) {
                payload.forEach(function(element) {
                    state.todoList.push(element)
                })
            } else {
                return state.todoList.push(payload);
            }
        },
        deleteTodo: function(state, payload) {
            // payload is todo Id
            let todolist = state.todoList;
            state.todoList = todolist.filter(function(element) {
                return element.id !== payload
            })
            return
        },
        modifyTodo: function(state, payload) {
            let todolist = state.todoList;
            state.todoList = todolist.map(function(element) {
                if (element.id === payload.id) {
                    return payload
                } else {
                    return element
                }
            });
            return
        }
    },
    actions: {
        getAllTodoList: async function(context) {
            try {
                context.state.todoList = []
                const { data } = await request.get(constants.api.endpoint);
                if (data.length > 0) {
                    context.commit('addTodoList', data)
                }
            } catch (e) {
                console.error(e);
                throw new Error("get To-do reqeust failed");
            }
        },
        deleteTodo: async function(context, todoId) {
            try {
                const { status } = await request.delete(constants.api.endpoint, { params: { id: todoId } })
                if (status === 200) {
                    context.commit('deleteTodo', todoId)
                }
            } catch (e) {
                throw new Error("delete To-do request failed")
            }
        },
        setTodo: async function(context, toDo) {
            // todo = Todo 객체
            try {
                const { status } = await request.post(constants.api.endpoint, toDo);
                if (status === 200) {
                    return context.commit('addTodoList', toDo)
                }
            } catch (e) {
                throw new Error("Add new Todo request failed")
            }
        },
        modifyTodo: async function(context, toDo) {
            // 정렬은 배열로 보내고, 일반 수정 및 완료처리는 json객체 하나로 보냄.
            try {
                const { status } = await request.put(constants.api.endpoint, toDo);
                if (status === 200) {
                    return context.commit('modifyTodo', toDo)
                }
            } catch (e) {
                throw new Error("Modify Todo request failed")
            }
        },
        modifyPriority: async function(context) {
            //
            try {
                const { status } = await request.put(constants.api.endpoint, context.state.todoList);
                if (status === 200) {
                    return context.commit('modifyTodo')
                }
            } catch (e) {
                throw new Error("Modify Todo request failed")
            }
        }
    }
});
export default store;