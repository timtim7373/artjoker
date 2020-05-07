
const { Readable } = require('stream');

class Source extends Readable
{
    constructor(array_of_data = [], opt = {}, type)
    {
        super(opt);
        this.type = type;
        this._array_of_data = array_of_data;
        this.on('error',(err)=>
        {
            console.log('Readable on error ', err);
        })
            .on('end',()=>
            {
                console.log('Readable on end ');
            })
            .on('close',()=>
            {
                console.log('Readable on close не все реализации генерируют это событие');
            });
    }
    _read()
    {
        let data = ``;
        if (this.type)
            data = this.makeJSON();
        else {
            data = this.makeCSV();
        }
        if (!data) {
            //сообщаем, что данные закончились
            this.push(null);
        } else {
            this.push(data);
        }
    }
    makeJSON() {
        let data = ``;
        if (this._array_of_data[0]) {
            if (this._array_of_data[0].userName === "userName") {
                let isLast = this._array_of_data.length === 1;
                data = "[\n\t" + this.formatObject(this._array_of_data.shift(), isLast);
            }
            else {
                let isLast = this._array_of_data.length === 1;
                data = this.formatObject(this._array_of_data.shift(), isLast);
            }
        }
        return data;
    }
    formatObject(obj, last) {
        obj = JSON.stringify(obj);
        obj = obj.replace("{", "{\n\t\t").replace(/,/g, ",\n\t\t").replace(/}/, "\n\t},\n\t");
        if (last)
            obj = obj.replace(/},\n\t/, "}\n]");
        return obj;
    }
    makeCSV() {
        let data = this._array_of_data.shift();
        if (data)
            data = `${data.userName},${data.firstName},${data.lastName},${data.age}\n`;
        return data;
    }
}

module.exports = Source;