const express = require('express');
const { FundTask, KPLEstablishConnection, KPLFundTask, getTaskStateInfo, KPLCheckProgram } = require('@_koii/create-task-cli');
const { establishConnection, checkProgram } = require('@_koii/create-task-cli');
const {PublicKey, Connection, Keypair} = require('@_koii/web3.js');
const crypto = require('crypto');
const { parse } = require('path');
const axios = require('axios');

// Import hero routes
const heroRoutes = require('./src/routes/heroes');

const app = express();
const port = process.env.PORT || 3000;

const SIGNING_SECRET = process.env.SIGNING_SECRET
const funder_keypair = process.env.funder_keypair
const user_id_list = ['U06NM9A2VC1', 'U02QTSK9R3N', 'U02QNL3PPFF']

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Integrate hero routes
app.use('/heroes', heroRoutes);

function verifySlackRequest(req) {
    try {
        const slackSignature = req.headers['x-slack-signature'];
        const timestamp = req.headers['x-slack-request-timestamp'];
        const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);
        
        if (timestamp < fiveMinutesAgo) {
            return false; // Request is too old
        }
        
        const body = req.body ? JSON.stringify(req.body) : '';
        const sigBasestring = `v0:${timestamp}:${body}`;
        const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
        const mySignature = 'v0=' + hmac.update(sigBasestring).digest('hex');

        return crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'));
    } catch (error) {
        console.error('Verification error:', error);
        return false;
    }
}

// Route to handle funding task
app.post('/fundtask', async (req, res) => {
    try {
        if (!verifySlackRequest(req)) {
            return res.status(400).send('Invalid request signature');
        }
        
        const { text, response_url, user_id } = req.body;
        
        if (!user_id || !user_id_list.includes(user_id)) {
            await axios.post(response_url, {
                response_type: "in_channel",
                text: 'Sorry, please tag <@U06NM9A2VC1> to add you to the list! '
            });
            return res.status(403).send('Unauthorized user');
        }
        
        const parts = text.split(' ').filter(part => part.trim() !== '');
        const TASK_ID = parts[0].trim();
        const AMOUNT = parts[1].trim();
        
        try {
            await generic_fund_task(TASK_ID, AMOUNT);
            await axios.post(response_url, {
                response_type: "in_channel",
                text: `Congrats! <@${user_id}> You funded ${AMOUNT} to task ${TASK_ID} successfully. `
            });
            res.status(200).send('Task funded successfully');
        } catch (error) {
            await axios.post(response_url, {
                response_type: "in_channel",
                text: `Failed to fund ${AMOUNT} to ${TASK_ID}. ${error.message}`
            });
            res.status(500).send('Failed to fund task');
        }
    } catch (error) {
        console.error('Fundtask route error:', error);
        res.status(500).send('Internal server error');
    }
});

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

async function generic_fund_task(TASK_ID, AMOUNT){
    const connection = new Connection("https://testnet.koii.network", "confirmed");

    const taskStateJSON = await getTaskStateInfo(
        connection,
        TASK_ID,
    );
    const stakePotAccount = new PublicKey(taskStateJSON.stake_pot_account, connection);
    if (taskStateJSON.token_type) {
        const mint_uint8 = Uint8Array.from(taskStateJSON.token_type);

        // Create the PublicKey
        const mint_publicKey = new PublicKey(mint_uint8);
        return await fund_a_KPL_task(TASK_ID, AMOUNT, stakePotAccount, connection, mint_publicKey)
        
    }else{
        return await fund_a_task(TASK_ID, AMOUNT, stakePotAccount, connection)
    }
}

async function fund_a_task(TASK_ID, AMOUNT, stakePotAccount, connection){
    console.log("Start Funding:");
    console.log("Funding task with Id: ", TASK_ID);
    console.log("Funding amount: ", AMOUNT);
    const payerKeypairString = process.env.funder_keypair;
    // Parse the JSON string into an array
    const payerKeypairArray = JSON.parse(payerKeypairString);
    // Convert the array to a Uint8Array
    const payerWallet = Uint8Array.from(payerKeypairArray);
    const payerKeypair = Keypair.fromSecretKey(payerWallet);
    const taskStateInfoAddress = new PublicKey(TASK_ID);
   
    const amount = parseInt(AMOUNT);
    
    // Create-task-cli package setup
    await establishConnection(connection);
    await checkProgram();
    await FundTask(payerKeypair, taskStateInfoAddress, stakePotAccount, amount);
}

async function fund_a_KPL_task(TASK_ID, AMOUNT, stakePotAccount, connection, mint_publicKey){
    console.log("Start Funding:");
    console.log("Funding task with Id: ", TASK_ID);
    console.log("Funding amount: ", AMOUNT);
    const payerKeypairString = funder_keypair
    // Parse the JSON string into an array
    const payerKeypairArray = JSON.parse(payerKeypairString);
    // Convert the array to a Uint8Array
    const payerWallet = Uint8Array.from(payerKeypairArray);
    const payerKeypair = Keypair.fromSecretKey(payerWallet);
    const taskStateInfoAddress = new PublicKey(TASK_ID);
    const amount = parseInt(AMOUNT);
    // Create-task-cli package setup
    await KPLEstablishConnection(connection);
    await KPLCheckProgram(); 
    await KPLFundTask(payerKeypair, taskStateInfoAddress, stakePotAccount, amount, mint_publicKey);
}

module.exports = server; // Export server for testing