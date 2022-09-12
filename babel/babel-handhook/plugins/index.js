module.exports = ({ types: t }) => {
  return {
    visitor: {
      Identifier() {
        console.log('identifier');
      },
    },
  };
};
