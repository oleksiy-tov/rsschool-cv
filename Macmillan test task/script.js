function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  const compl = document.getElementById('compl');
  const dl = document.getElementById('dl');
  const reLoad = document.getElementById('reLoad');


  reader.readAsText(file);


  reader.onload = function () {
    let input = [];
    let output = [];
    let temp = [];
    let rezalt = [];
    let canvas = [];
    let rezaltB = [];
    let countBR = 0;
    let countBL = 0;
    let flag1 = true;
    let flag2 = true;
    let flag3 = true;
    let flag4 = true;
    let xDown = 0;
    let bDown = 0;

    input = reader.result.split('\n');

    for (let i = 0; i < input.length; i++) {
      if (input[i].split(' ')[0] == 'C') {
        temp[0] = '-'.repeat(+input[i].split(' ')[1] + 2);
        for (let j = 1; j < +input[i].split(' ')[2] + 1; j++) {
          temp[j] = '|' + ' '.repeat(+input[i].split(' ')[1]) + '|';
        }
        temp[+input[i].split(' ')[2] + 1] = '-'.repeat(+input[i].split(' ')[1] + 2);
        canvas = temp.slice();
        rezalt[i] = temp.slice();
      }
      xDown = +input[0].split(' ')[2] - 1;
      bDown = +input[0].split(' ')[2] - 1;
      if (input[i].split(' ')[0] == 'L') {
        if (+input[i].split(' ')[2] == +input[i].split(' ')[4]) {
          temp[+input[i].split(' ')[2]] = rezalt[i - 1][+input[i].split(' ')[2]].slice(0, +input[i].split(' ')[1]) +
            'x'.repeat(+input[i].split(' ')[3] - (+input[i].split(' ')[1] - 1)) +
            rezalt[i - 1][+input[i].split(' ')[2]].slice(+input[i].split(' ')[3] + 1);
          rezalt[i] = temp.slice();
        }
        if (+input[i].split(' ')[1] == +input[i].split(' ')[3]) {
          for (let k = +input[i].split(' ')[2]; k < +input[i].split(' ')[4] + 1; k++) {
            temp[k] = rezalt[i - 1][k].slice(0, +input[i].split(' ')[1]) +
              'x' +
              rezalt[i - 1][k].slice(+input[i].split(' ')[3] + 1);
          }
          rezalt[i] = temp.slice();
        }
      }
      if (input[i].split(' ')[0] == 'R') {
        temp[+input[i].split(' ')[2]] = rezalt[i - 1][+input[i].split(' ')[2]].slice(0, +input[i].split(' ')[1]) +
          'x'.repeat(+input[i].split(' ')[3] - (+input[i].split(' ')[1] - 1)) +
          rezalt[i - 1][+input[i].split(' ')[2]].slice(+input[i].split(' ')[3] + 1);
        for (let k = +input[i].split(' ')[2] + 1; k < +input[i].split(' ')[4]; k++) {
          temp[k] = rezalt[i - 1][k].slice(0, +input[i].split(' ')[1]) +
            'x' +
            ' '.repeat(+input[0].split(' ')[1] - 1 - (+input[i].split(' ')[1])) +
            'x' +
            rezalt[i - 1][k].slice(+input[i].split(' ')[3] + 1);
        }
        temp[+input[i].split(' ')[4]] = rezalt[i - 1][+input[i].split(' ')[4]].slice(0, +input[i].split(' ')[1]) +
          'x'.repeat(+input[i].split(' ')[3] - (+input[i].split(' ')[1] - 1)) +
          rezalt[i - 1][+input[i].split(' ')[4]].slice(+input[i].split(' ')[3] + 1);
        rezalt[i] = temp.slice();
      }
      if (input[i].split(' ')[0] == 'B') {
        if (rezalt[i - 1][+input[i].split(' ')[2]].slice(+input[i].split(' ')[1], (+input[i].split(' ')[1] + 1)) == 'x') {
          for (let k = +input[i].split(' ')[1]; rezalt[i - 1][+input[i].split(' ')[2]].slice(k, (k + 1)) == 'x'; k++) {
            countBR = k;
          }
          for (let k = +input[i].split(' ')[1]; rezalt[i - 1][+input[i].split(' ')[2]].slice(k, (k + 1)) == 'x'; k--) {
            countBL = k;
          }
          temp[+input[i].split(' ')[2]] = rezalt[i - 1][+input[i].split(' ')[2]].slice(0, countBL) +
            input[i].split(' ')[3].repeat(+input[i].split(' ')[1] - countBL) +
            input[i].split(' ')[3].repeat(countBR + 1 - (+input[i].split(' ')[1])) +
            rezalt[i - 1][+input[i].split(' ')[2]].slice(countBR + 1);
          rezaltB = rezalt[i - 1].slice();
          for (let j = +input[i].split(' ')[2] + 1; j < +input[0].split(' ')[2] + 1; j++) {
            let count = 0;
            for (let char of temp[j - 1]) {
              if (char == input[i].split(' ')[3]) {
                if (rezalt[i - 1][j].slice(count, (count + 1)) == 'x') {
                  flag1 = false;
                  rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(count, input[i].split(' ')[3]);
                  for (let m = count - 1; rezalt[i - 1][j].slice(m, m + 1) == 'x'; m--) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                  for (let m = count + 1; rezalt[i - 1][j].slice(m, m + 1) == 'x'; m++) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                }
              }
              count++;
            }
            temp[j] = rezalt[i - 1][j];
            if (flag1) { xDown = j - 2; break; }
          }
          for (let j = xDown; j > 0; j--) {
            let count = 0;
            for (let char of temp[j + 1]) {
              if (char == input[i].split(' ')[3]) {
                if (rezalt[i - 1][j].slice(count, (count + 1)) == 'x') {
                  flag2 = false;
                  rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(count, input[i].split(' ')[3]);
                  for (let m = count - 1; rezalt[i - 1][j].slice(m, m + 1) == 'x'; m--) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                  for (let m = count + 1; rezalt[i - 1][j].slice(m, m + 1) == 'x'; m++) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                }
              }
              count++;
            }
            temp[j] = rezalt[i - 1][j];
            if (flag2) break;
          }
          rezalt[i] = temp.slice();
        } else {
          for (let k = +input[i].split(' ')[1]; rezalt[i - 1][+input[i].split(' ')[2]].slice(k, (k + 1)) == ' '; k++) {
            countBR = k;
          }
          for (let k = +input[i].split(' ')[1]; rezalt[i - 1][+input[i].split(' ')[2]].slice(k, (k + 1)) == ' '; k--) {
            countBL = k;
          }
          temp[+input[i].split(' ')[2]] = rezalt[i - 1][+input[i].split(' ')[2]].slice(0, countBL) +
            input[i].split(' ')[3].repeat(+input[i].split(' ')[1] - countBL) +
            input[i].split(' ')[3].repeat(countBR + 1 - (+input[i].split(' ')[1])) +
            rezalt[i - 1][+input[i].split(' ')[2]].slice(countBR + 1);
          rezaltB = rezalt[i - 1].slice();
          for (let j = +input[i].split(' ')[2] + 1; j < +input[0].split(' ')[2] + 1; j++) {
            let count = 0;
            for (let char of temp[j - 1]) {
              if (char == input[i].split(' ')[3]) {
                if (rezalt[i - 1][j].slice(count, (count + 1)) == ' ') {
                  flag3 = false;
                  rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(count, input[i].split(' ')[3]);
                  for (let m = count - 1; rezalt[i - 1][j].slice(m, m + 1) == ' '; m--) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                  for (let m = count + 1; rezalt[i - 1][j].slice(m, m + 1) == ' '; m++) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                }
              }
              count++;
            }
            temp[j] = rezalt[i - 1][j];
            if (flag3) { bDown = j - 2; break; }
          }
          for (let j = bDown; j > 0; j--) {
            let count = 0;
            for (let char of temp[j + 1]) {
              if (char == input[i].split(' ')[3]) {
                if (rezalt[i - 1][j].slice(count, (count + 1)) == ' ') {
                  flag4 = false;
                  rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(count, input[i].split(' ')[3]);
                  for (let m = count - 1; rezalt[i - 1][j].slice(m, m + 1) == ' '; m--) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                  for (let m = count + 1; rezalt[i - 1][j].slice(m, m + 1) == ' '; m++) {
                    rezalt[i - 1][j] = rezalt[i - 1][j].replaceAt(m, input[i].split(' ')[3]);
                  }
                }
              }
              count++;
            }
            temp[j] = rezalt[i - 1][j];
            if (flag4) break;
          }
          rezalt[i] = temp.slice();
        }
      }
    }
    for (let m = 1; m < rezalt.length; m++) {
      if (m == rezalt.length - 2) rezalt[m] = rezaltB;
      output = output.concat(rezalt[m]);
    }

    output = canvas.concat(output);

    writeFile('newOutput.txt', output.join('\n'));
    compl.style.display = "inline";
    dl.style.display = "none";
    reLoad.style.display = "inline";
  };


  reader.onerror = function () {
    alert(reader.error);
  };
}



function writeFile(name, value) {
  let val = value;
  let download = document.createElement('a');
  download.href = 'data:text/plain;content-disposition=attachment;filename=file,' + val;
  download.download = name;
  download.style.display = 'none';
  download.id = 'download';
  document.body.appendChild(download);
  document.getElementById('download').click();
  document.body.removeChild(download);
}



String.prototype.replaceAt = function (index, replace) {
  return this.substr(0, index) + replace + this.substr(index + replace.length);
}