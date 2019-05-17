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
        todoList: []
    },
    getters: {
        getTodoList: function(state) {
            return state.todoList;
        }
    },
    mutations: {
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
                return element.LIST_ID !== payload
            })
            return
        },
        modifyTodo: function(state, payload) {
            let todolist = state.todoList;
            state.todoList = todolist.map(function(element) {
                if (element.LIST_ID === payload.LIST_ID) {
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
                const { status } = await request.delete(constants.api.endpoint, { params: { LIST_ID: todoId } })
                if (status === 200) {
                    context.commit('deleteTodo', todoId)
                }
            } catch (e) {
                throw new Error("delete To-do request failed")
            }
        },
        setTodo: async function(context, toDo) {
            // todo = Todo rorcp
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
            try {
                const { status } = await request.put(constants.api.endpoint, toDo);
                if (status === 200) {
                    return context.commit('modifyTodo', toDo)
                }
            } catch (e) {
                throw new Error("Modify Todo request failed")
            }
        }
    }
});
export default store;