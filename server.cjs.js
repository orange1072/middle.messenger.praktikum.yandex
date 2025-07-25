import express from 'express';
import path from 'path';

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.static('./dist'));

app.get('/*"*"', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    res.status(200);
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
