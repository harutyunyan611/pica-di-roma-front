export default {
  getBaseConfig() {
    return {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  },
};
