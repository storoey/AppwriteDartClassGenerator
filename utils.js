export const Utils = {
  fileName: function(filePath) {
    const split = filePath.split('/');

    return split[split.length - 1];
  }
}