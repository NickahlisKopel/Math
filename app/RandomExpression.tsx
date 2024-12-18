
const expressions = ["+","*","-","/"]

export default function RandomExpression(){
    const number1 = Math.floor(Math.random() * 10);
    const number2 = Math.floor(Math.random() * 10);
    const operator = expressions[Math.floor(Math.random() * expressions.length)];
    const expression = [number1, operator, number2];
    var out = expression.toString().replaceAll(",","");
    var equation = out.split("");
    console.log(equation)
    return equation;
}