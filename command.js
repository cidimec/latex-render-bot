const {exec} = require("child_process");
var a=0;
const command=`curl -F file=@image_${String(a)}.png -F "initial_comment=jaja" -F channels=C01D03NJYM7 -H "Authorization: Bearer xoxp-1274619549590-1281426158306-1442052127345-8b7cdc4e8251aa43a125cd9842b541f4" https://slack.com/api/files.upload`;
exec(command).toString();