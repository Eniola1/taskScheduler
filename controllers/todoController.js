var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const { MongoClient } = require('mongodb');
//const { default: mongoose } = require('mongoose');

async function main(){
    const uri = "mongodb+srv://Enny:Passw0rd_@cluster0.mir6p.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);       
    }); 
}

var data = [{item:'get milk'}, {item:'walk dog'}, {item:'practise'}];

//Create a schema 
// var todoSchema = new mongoose.Schema({
//     item:String
// });

// var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

module.exports = function(app){

app.get('/todo', function(req, res){
    res.render('todo', {todos: data}); 
});

app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body)
    res.json(data); 
});

app.get('/todo', function(req, res){

});

app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});

};