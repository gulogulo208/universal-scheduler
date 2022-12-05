module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  permissionCheck: function (value) {
    if (value === 1) {
      const permissionValidated = true;
      return permissionValidated;
    } else {
      const permissionValidated = false;
      return permissionValidated;
    }
  },
  parseIndex: (val) => {
    return parseInt(val) + 1;
  },
  hasProject: (val) => {
    if (val >= 1) {
      const available = false
      return available;
    } else {
      const available = true;
      return available;
    }
  }
};