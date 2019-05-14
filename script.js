let valuesTable = [{
  x: 2,
  px: 2.5
},
{
  x: 4,
  px: 1
}, {
  x: 3,
  px: 2
}];

let dx = 0;
let ex = 0;

const exResultElement = document.getElementById('ex-result');
const exCalculationElement = document.getElementById('ex-calculation');
const dxResultElement = document.getElementById('dx-result');
const dxCalculationElement = document.getElementById('dx-calculation');
const tableElement = document.getElementById('table');

recalc();

function recalc() {
  calculateEx();
  calculateDx();

  updateTable();
}

function calculateEx() {

  let calculationString = "Ex = ";
  let first = true;

  ex = 0;

  for(let i = 0; i < valuesTable.length; i ++) {
    if(isNaN(valuesTable[i].x) || isNaN(valuesTable[i].px)) continue;
    ex += valuesTable[i].x * valuesTable[i].px;

    if(!first) {
      calculationString += ' + ';
    } else first = false;
    calculationString += valuesTable[i].x + ' * ' + valuesTable[i].px;
  }
  exResultElement.value = ex;
  exCalculationElement.innerHTML = calculationString + ' = ' + ex;
}
function calculateDx() {

  dx = 0;

  let calculationString = "Dx = ";
  let additionalCalculation = "";
  let first = true;

  for(let i = 0; i < valuesTable.length; i ++) {
    if(isNaN(valuesTable[i].x) || isNaN(valuesTable[i].px)) continue;
    let tempCalc = Math.pow(valuesTable[i].x - ex, 2) * valuesTable[i].px
  
    dx += tempCalc;

    if(!first) {
      calculationString += ' + ';
      additionalCalculation += ' + ';
    } else first = false;
    calculationString += `(${valuesTable[i].x} - ${ex})<sup>2</sup> * ${valuesTable[i].px}`;
    additionalCalculation += tempCalc;
  }
  dxResultElement.value = Math.sqrt(dx);
  dxCalculationElement.innerHTML = calculationString + ' = ' + additionalCalculation + ' = ' + dx + '<br>&#x221A;Dx = ' + Math.sqrt(dx);
}
function addVal(event) {
  event.preventDefault();

  let x = parseFloat(document.getElementById('x-value').value);
  let px = parseFloat(document.getElementById('p-value').value);

  if(!(isNaN(x) || isNaN(px))) {
    valuesTable.push({
      x,
      px
    });

    recalc();

  }
}

function deleteObj(id) {
  valuesTable.splice(id, 1);
  recalc();
}
function updateTable() {

  let xString  = "", pXString = "", editingText = "";
  for(let i = 0; i < valuesTable.length; i ++) {


    xString += '<td>' + valuesTable[i].x + '</td>';
    pXString += '<td>' + valuesTable[i].px + '</td>';
    editingText += '<td><button onclick="deleteObj(' + i + ')">X</button></td>';
  }

  tableElement.innerHTML = `
  <table>
    <tbody>
      <tr>
        <td>X</td>
        ${xString}
      </tr>
      <tr>
        <td>P(X)</td>
        ${pXString}
      </tr>
      <tr>
        <td></td>
        ${editingText}
      </tr>
    </tbody>
  </table>`;
}
