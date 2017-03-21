let special = '-[](){}/+*?.^$|'.split('').join('\\')
let regex = RegExp('['+special+']','g');
export default str => str.replace(regex,'\\$&')