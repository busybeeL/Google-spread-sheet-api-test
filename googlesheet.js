var GoogleSheets = require('google-drive-sheets'); // googlesheets api
var http = require('http');
var url = require('url');
var fs = require('fs');

var express = require('express');
var app = express();

// spreadsheet key is the long id in the sheets URL
var mySheet = new GoogleSheets('1xIVgF_WAb5ZcJF9d0a9WWAvGW5oLCaYg_R9jiROkHMM');

app.set('view engine', 'pug');

// Without auth -- read only
// IMPORTANT: See note below on how to make a sheet public-readable!
// # is worksheet id - IDs start at 1

mySheet.getRows(1, function(err, rowData) {
    console.log(rowData);
    var titles = [];
    var contents = [];
    for(var i = 0; i < rowData.length; i++) {
        var itemT = rowData[i].name;
        var itemC = rowData[i].grade;
        titles += ' ' + itemT
        contents += ' ' + itemC
    }
    var titleS = titles.split(" ");
    var titleL = titleS.filter(Boolean);
    var contentS = contents.split(" ");
    var contentL = contentS.filter(Boolean);
    console.log(titleL);
    console.log(contentL);


    app.get('/', function(req, res){
        res.render (
            'index',
            { title: titleL, content: contentL}
        )
    });
    app.listen(3000, function () {  
        console.log('Example app listening on port 3000!')
    })


});

// With auth -- read + write
// see below for authentication instructions
var creds = require('./google-generated-creds.json');
// OR, if you cannot save the file locally (like on heroku)
var creds = {
  client_email: 'test-93@read-data-222821.iam.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaQXWgbkow/HTi\nc/oN76WPECaEEs6kUXjaBBJLVtm/zzzvJ2L1RYdDKu08aHc1Iavw+rcD/gaLzr9w\nf8gp66hhy6k1R0XltN+HZnkoHOkF8mT3aJ9btqaRb9NFBwzpfgpnm7dXnAHvJ1Mm\n67Ke4iRdgJnZ0NtmCuozZehipgiZsQ+SJ7dWCdigKCvXnfbHthYQmLcOPPe2xAXX\nDl4iTBLQrb4k/X/6WGVgmgk57d+VPSZhDS7getpa+iQ/NhNpc+oKnzuRAKeUSVvC\nXyLKG/EOQ+RWYV79wMjqbBDYqJKe6pceZTjCl8KhnDfgZAmnfNSjmOifPNuYN2gL\nG7Z3I+13AgMBAAECggEAFtFxE3rNGcL2jVsHldEp5ehHMklP7QmqPWHVzPQ7gL6o\nrl3eqxaOZDaw4js3yxHAjASiVwJYOI0sT3lvhBf6kADe9mUlJ04itLZJXNAt/jW1\njs2YqSnzKNdoYrEgzVdaNapYrCqFNLnV+I9sHEmqhHRWDdzx333k2BaOki0qX4WR\nE5BKqBlE7Xp3HvaNqJ5huHxCL8vftBCsP2gRJdidr5LSwjHAcchIACfN/yjZIr2O\nLlfVLV9WnHWlaEg0Rx/G1fLMGNa9/nETt436EhHlanLQEudN+obsLb/kUBnwSeFB\nufPNbAoQBBsqOQ8jVcuzMDg1d9rr9Z7kI342Mys/rQKBgQDZ9v6x/8qDWBGY/5XO\nAocCYErR/H+fI+ivqozGFPDyz2HK5sH/Smu6yqN8OT3c1MOUikp2DP8sYKDZTmVs\nssWhdW+IHHy1RNy6fpjQ5pay8M4+Wb6C/rjuVF4rBql3AHNMVduWTo8Je8kb7qZy\n0U8XB5aZA+REbUcMHWE2psBX3QKBgQC1LG1XqasPBRw/mTtpV+YKRzghkM6kdHqn\nQOxrwdbGDwqILTMnjOc4FoDCc2podHwHD6CNF1W1CKrrYGuNLs21ZiBD21Iv/dNf\n002mqpND1hN+dqbSz6V7venTEls0SaV5hIogXV1DTaQmOUsUSJW7E5TWQMYeBpgP\ntWuNIEwPYwKBgEGx8Xhi+X33CG7N8jACkQDFVyfNbAXiQ9rWk9GMNEdq/DW0sZop\nqyjEtNvXQO8TbdOSjvjf1/VfNnvo5icKBwkwJSqoM2pLVCAd0h98sMVEUVV3pTVE\nYybqZOug+Wj1yMqkQigei3w3RBlYJ/EJZ0YwslJyWtXI/hYHsOpQ/j49AoGAC1b6\niRAfmtMRD5IBu/g6d845XzB3HqgDvVA8/Amn7cGnQRrDJuiU2FfgO0uKD3uq/64k\nuHALd0dRm2XvlWimi4IW5uhlXoeeoVLSe2oVyZsuoS3AB1Xj37jlV8bAWqd5af+3\nvYraeYn0ikfvwRdB9/Gj0T1AqUR0ZBdQ4gZxfE0CgYEAmdUpSMf4O6jMwwRzFLL6\nA8TDc5JuADcLl/LcpMczXyV6OXAvivO/0yCR5HIyuVZC+zC1TL1VzZi0sdzW6hk1\nyS/bUCuM8fkXNKr2X0Ik+7NVvGuTFISmGL2CS/n/FFR/oCS+Up7vG93EeGE2dbeD\nEP2jjCh1YY/3Gr2mt6Zxkng=\n-----END PRIVATE KEY-----\n'
}
 

// tried binding data into HTML file and failed!!


