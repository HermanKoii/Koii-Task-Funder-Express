import express, { Express, Request, Response } from 'express';
import http from 'http';
import { configureMiddleware, errorHandler } from './middleware/requestMiddleware';
import crypto from 'crypto';
import axios from 'axios';
import { 
  FundTask, 
  KPLEstablishConnection, 
  KPLFundTask, 
  getTaskStateInfo,
  KPLCheckProgram,
  establishConnection, 
  checkProgram 
} from '@_koii/create-task-cli';
import { PublicKey, Connection, Keypair } from '@_koii/web3.js';

const user_id_list = ['U06NM9A2VC1', 'U02QTSK9R3N', 'U02QNL3PPFF'];

function verifySlackRequest(req: Request): boolean {
    const slackSignature = req.headers['x-slack-signature'] as string;
    const timestamp = req.headers['x-slack-request-timestamp'] as string;
    const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);
    
    // Prevent replay attacks by checking timestamp
    if (parseInt(timestamp) < fiveMinutesAgo) {
        return false; // Request is too old
    }
    
    const sigBasestring = `v0:${timestamp}:${req.body.toString()}`;
    const hmac = crypto.createHmac('sha256', process.env.SIGNING_SECRET || '');
    const mySignature = 'v0=' + hmac.update(sigBasestring).digest('hex');

    // Constant time comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'));
}

async function generic_fund_task(TASK_ID: string, AMOUNT: string) {
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
        await fund_a_KPL_task(TASK_ID, AMOUNT, stakePotAccount, connection, mint_publicKey);
    } else {
        await fund_a_task(TASK_ID, AMOUNT, stakePotAccount, connection);
    }
}

async function fund_a_task(TASK_ID: string, AMOUNT: string, stakePotAccount: PublicKey, connection: Connection) {
    const payerKeypairString = process.env.funder_keypair || '[]';
    const payerKeypairArray = JSON.parse(payerKeypairString);
    const payerWallet = Uint8Array.from(payerKeypairArray);
    const payerKeypair = Keypair.fromSecretKey(payerWallet);
    const taskStateInfoAddress = new PublicKey(TASK_ID);
   
    const amount = parseInt(AMOUNT);
    
    await establishConnection(connection);
    await checkProgram();
    await FundTask(payerKeypair, taskStateInfoAddress, stakePotAccount, amount);
}

async function fund_a_KPL_task(TASK_ID: string, AMOUNT: string, stakePotAccount: PublicKey, connection: Connection, mint_publicKey: PublicKey) {
    const payerKeypairString = process.env.funder_keypair || '[]';
    const payerKeypairArray = JSON.parse(payerKeypairString);
    const payerWallet = Uint8Array.from(payerKeypairArray);
    const payerKeypair = Keypair.fromSecretKey(payerWallet);
    const taskStateInfoAddress = new PublicKey(TASK_ID);
    const amount = parseInt(AMOUNT);
    
    await KPLEstablishConnection(connection);
    await KPLCheckProgram(); 
    await KPLFundTask(payerKeypair, taskStateInfoAddress, stakePotAccount, amount, mint_publicKey);
}

/**
 * Creates and configures an Express server for the CoinGecko Mock API
 * @returns {http.Server} HTTP Server instance
 */
export function createServer(): http.Server {
  const app: Express = express();
  const PORT: number = parseInt(process.env.PORT || '3000', 10);

  // Configure middleware
  configureMiddleware(app);
  app.use(express.raw({ type: 'application/x-www-form-urlencoded' }));

  // Health check endpoint
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      message: 'CoinGecko Mock API is running',
      timestamp: new Date().toISOString()
    });
  });

  // Route to handle funding task
  app.post('/fundtask', async (req: Request, res: Response) => {
    try {
      if (!verifySlackRequest(req)) {
          return res.status(400).send('Invalid request signature');
      }

      const rawBody = req.body.toString('utf8');
      const bodyParams = new URLSearchParams(rawBody);
      const parsedBody = Object.fromEntries(bodyParams.entries());
      const text = parsedBody.text;
      const response_url = parsedBody.response_url;
      const user_id = parsedBody.user_id; 

      if (!user_id || !user_id_list.includes(user_id)) {
          await axios.post(response_url, {
              response_type: "in_channel",
              text: 'Sorry, please tag <@U06NM9A2VC1> to add you to the list! '
          });
          return res.status(403).send('Unauthorized user');
      }
      
      let parts = text.split(' ').filter(part => part.trim() !== '');
      let TASK_ID = parts[0].trim();
      let AMOUNT = parts[1].trim();
      
      await generic_fund_task(TASK_ID, AMOUNT);
      
      await axios.post(response_url, {
          response_type: "in_channel",
          text: `Congrats! <@${user_id}> You funded ${AMOUNT} to task ${TASK_ID} successfully. `
      });
      
      res.status(200).send('Task funded successfully');
    } catch (e) {
      await axios.post(parsedBody.response_url, {
          response_type: "in_channel",
          text: `Failed to fund task. ${e}`
      });
      res.status(500).send('Internal server error');
    }
  });

  // Global error handler
  app.use(errorHandler);

  // Create HTTP server
  const server = http.createServer(app);

  // Start server method
  server.start = function() {
    return this.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };

  return server;
}

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = createServer();
  server.start();
}