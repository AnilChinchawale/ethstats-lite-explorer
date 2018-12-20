import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const CONNECTION_JSON_RPC = 'json_rpc';


const store = new Vuex.Store({
  state: {
    nodeUrl: process.env.VUE_APP_NODE_URL,
    connectionType: process.env.VUE_APP_CONNECTION_TYPE || CONNECTION_JSON_RPC,
    nodeUser: process.env.VUE_APP_NODE_USER,
    nodePass: process.env.VUE_APP_NODE_PASS,
    w3: null,
    blocks: {}, // Store cached blocks
    transactions: {}, // Store cached transactions
    pendingQueries: {}, // Store which blocks/tx are currently being queried
    lastBlock: -1,
    // We just store those for stats purpose
    totalBlocks: 0,
    totalTransactions: 0,
    countPending: 0,
    lastBlockFull: null,
    peers: 0,
    nodeType: null,
  },
  /*
  *  Mutations are used by the internal library and should not be called by someone else.
  */
  mutations: {
    setWeb3(state, createdWeb3) {
      state.w3 = createdWeb3;
    },
    setPending(state, key) {
      Vue.set(state.pendingQueries, key, true);
      state.countPending += 1;
    },
    removePending(state, key) {
      Vue.delete(state.pendingQueries, key);
      state.countPending -= 1;
    },
    storeBlock(state, block) {
      Vue.set(state.blocks, block.number, block);
      state.totalBlocks += 1;
    },
    storeTransaction(state, transaction) {
      Vue.set(state.transactions, transaction.hash, transaction);
      state.totalTransactions += 1;
    },
    setLastBlock(state, blockNumber) {
      if (state.lastBlock < blockNumber) {
        state.lastBlock = blockNumber;
      }
    },
    setLastBlockFull(state, block) {
      if (state.lastBlockFull) {
        if (state.lastBlockFull.number < block.number) {
          state.lastBlockFull = block;
        }
      } else {
        state.lastBlockFull = block;
      }
    },
    setPeers(state, count) {
      if (state.peers !== count) {
        state.peers = count;
      }
    },
    setNodeType(state, type) {
      if (state.nodeType !== type) {
        state.nodeType = type;
      }
    },
    setNodeUrl(state, url) {
      state.nodeUrl = url;
    },
  },
  actions: {

  },
  getters: {
    connectionType: state => state.connectionType,
    nodeUrl: state => state.nodeUrl,
    nodeUser: state => state.nodeUser,
    nodePass: state => state.nodePass,
  },
});
export default store;
