
const fs = require("fs");
const User = require("../modules/db").User;
const createError = require('http-errors');

class UploadCSV {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.control = 0;
        this.control2 = 0;
    }
    saveUsers(content) {
        User.create({
            userName: content[0],
            firstName: content[1],
            lastName: content[2],
            age: +content[3]
        }).then(res=>{
            this.control2++;
            if (this.control === this.control2) {
                this.res.send("File uploaded");
            }
        }).catch(err=>this.next(new Error(err)));
    }

    parseCSV(fileContents) {
        let content = fileContents.split("\r\n");
        content.forEach((item, i) => {
            if (i > 0) {
                content[i] = item.split(",");
                if (content[i].length === 4) {
                    this.control++;
                    this.saveUsers(content[i]);
                }
            }
        });
    }
    readFile(file) {
        let _this = this;
        if (file.length === undefined) {
            fs.readFile(`${file.path}`, function (err, data) {
                if (err) return _this.next(new Error(err));
                let fileContents = data.toString();
                _this.parseCSV(fileContents);
            });
        }
    }
}

module.exports = UploadCSV;