module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    permissionCheck: function(value){
        if (value <= 2) {
          const permission = true;
          return permission
        } else {
          const permission = false;
          return permission
        }
      }
}