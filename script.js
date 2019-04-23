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
  document.getElementById('ex-result').value = ex;
  document.getElementById('ex-calculation').innerHTML = calculationString + ' = ' + ex;
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
  document.getElementById('dx-result').value = Math.sqrt(dx);
  document.getElementById('dx-calculation').innerHTML = calculationString + ' = ' + additionalCalculation + ' = ' + dx + '<br>&#x221A;Dx = ' + Math.sqrt(dx);
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

  document.getElementById('table').innerHTML = `
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
