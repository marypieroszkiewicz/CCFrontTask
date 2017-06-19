const { damage } = require("./spell");

console.assert(2 === damage("feeai")); // == 2
console.assert(7 === damage("feaineain")); // == 1 + 2 + 2 + 2 = 7 (fe-ai-ne-ai) - not (fe-ain-ai) because 1+3+2 = 6 and 7 > 6
console.assert(0 === damage("jee")); // == 0
console.assert(0 === damage("fefefefefeaiaiaiaiai")); // == 0 (more than one 'fe')
console.assert(1 === damage("fdafafeajain")); // == 1 (fe-ai) 3 - 2 (because 'aj')
console.assert(0 === damage("fexxxxxxxxxxai")); // == 0 (3-10 = -7 < 0)