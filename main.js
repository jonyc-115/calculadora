const d = document,
  $numbers = d.querySelectorAll(".btn-number"),
  $cursor = d.querySelector(".blink"),
  $display = d.getElementById("display");

const operandos = {
  a: "",
  b: "",
};
let html = "";
let operacionActual = null;
let intervalos = null;
let resultado;

function realizarOperacion() {
  const num1 = parseFloat(operandos.a);
  const num2 = parseFloat(operandos.b);

  switch (operacionActual) {
    case "+":
      return num1 + num2;
    case "×":
      return num1 * num2;
    case "÷":
      return num1 / num2;
    case "-":
      return num1 - num2;

    default:
      break;
  }
}

function validationNumbers(number, operandos) {
  if (
    (number === "0" && operandos.a === "0") ||
    (number === "0" && operandos.b === "0")
  )
    return;

  if (number !== "0" && operandos.a === "0") operandos.a = "";

  if (number !== "0" && operandos.b === "0") operandos.b = "";
}

d.addEventListener("click", (e) => {
  if (e.target.id === "delete") {
    operacionActual = null;
    clearInterval(intervalos);
    intervalos = null;
    $display.textContent = "";
    $display.appendChild($cursor);
    html = "";
    operandos.a = "";
    operandos.b = "";
  }

  if (e.target.matches(".btn-number")) {
    if ($display.children[0]) $display.removeChild($cursor);

    const number = e.target.textContent;

    validationNumbers(number, operandos);

    console.log(number);

    if (operacionActual === null) {
      operandos.a += number;
    } else {
      operandos.b += number;
    }

    console.log(intervalos);

    if (!intervalos) {
      intervalos = setInterval(() => {
        console.log("interval");
        $display.textContent =
          operandos.a + (operacionActual ? operacionActual : "") + operandos.b;
      }, 100);
    }
  }

  if (e.target.matches("#sum")) {
    if (!operandos.a) {
      operacionActual = null;
    } else {
      operacionActual = "+";
    }
  }

  if (e.target.matches("#mult")) {
    operacionActual = "×";
  }

  if (e.target.matches("#div")) {
    operacionActual = "÷";
  }

  if (e.target.matches("#rest")) {
    operacionActual = "-";
  }

  if (e.target.id === "equal") {
    if (!operacionActual || !operandos.a || !operandos.b) return;

    resultado = realizarOperacion();
    $display.textContent = resultado;

    operandos.a = resultado;
    operandos.b = "";
    operacionActual = null;
  }
});
