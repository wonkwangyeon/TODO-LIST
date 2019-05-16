import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        mainList: [],
        completeList: []
    },
    getters: {
        getMainList: function(state) {
            return state.mainList;
        },
        getCompleteList: function(state) {
            return state.completeList;
        }
    },
    mutations: {
        addMainList: function(state, payload) {

            return state.mainList.push({
                LIST_ID: payload.LIST_ID,
                LIST_TITLE: payload.LIST_TITLE,
                LIST_CONTENT: payload.LIST_CONTENT,
                LIST_EXPIRE: payload.LIST_EXPIRE,
                LIST_CREATED_TIME: payload.LIST_CREATED_TIME,
                LIST_PRIORITY: payload.LIST_PRIORITY
            });
        },
        addCompleteList: function(state, payload) {

            return state.completeList.push({
                LIST_ID: payload.LIST_ID,
                LIST_TITLE: payload.LIST_TITLE,
                LIST_CONTENT: payload.LIST_CONTENT,
                LIST_EXPIRE: payload.LIST_EXPIRE,
                LIST_CREATED_TIME: payload.LIST_CREATED_TIME,
                LIST_PRIORITY: payload.LIST_PRIORITY
            });
        },
        deleteMainList: function(state, payload) {
            return state.mainList.splice(payload, 1)
        },
        deleteCompleteList: function(state, payload) {
            return state.completeList.splice(payload, 1)
        }
    }
});
export default store;