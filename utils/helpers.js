module.exports = {
    format_time: (date) => {
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    },
    eq: function(arg1, arg2) {
      return arg1 === arg2;
    }
    // format_date: (date) => {
    //   return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    //     new Date(date).getFullYear()}`;
    // },
  };
  