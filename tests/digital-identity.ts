import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DigitalIdentity } from "../target/types/digital_identity";
import sha256 from "fast-sha256"
import { DigitalIdentityParam } from "../digitalIdentity/js/src/generated";

describe("digital-identity", async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.local("http://127.0.0.1:8899");
  anchor.setProvider(provider);
  const con = new anchor.web3.Connection("http://127.0.0.1:8899")
  const auth = anchor.web3.Keypair.generate();
  
  const program = anchor.workspace.DigitalIdentity as Program<DigitalIdentity>;
  const [digitalIdPda,bump1] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("dig_identity"),auth.publicKey.toBuffer()],program.programId);
  const [digitalProofPda,bump2] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("dig_proof"),digitalIdPda.toBuffer()],program.programId);

  it("create Identity!", async () => {
    const tx1 = await con.requestAirdrop(auth.publicKey,10 * anchor.web3.LAMPORTS_PER_SOL);
    await con.confirmTransaction(tx1)
    const bal = await con.getBalance(auth.publicKey);
    console.log("bal:",bal)
    const data:DigitalIdentityParam = {name:"harsha",contactNumber:"98762518326",dob:"25-09-2001",residenceAddress:"tumkur",panNumber:"kadh96y29",aadharNumber:"9187987dhjao",passportId:"2oehiy992"}
    // Add your test here.
    const jsonObj = JSON.stringify(data)
 
// read json string to Buffer
    const buf = Buffer.from(jsonObj);
    const hash = sha256(buf) ;
    console.log(Buffer.from(hash).toString("hex"))
    // const hash = sha256();
    const tx2 = await program.methods.
    createIdentity(data).
    accounts({digIdentityAcc:digitalIdPda,systemProgram:anchor.web3.SystemProgram.programId,authority:auth.publicKey}).signers([auth]).rpc()
    console.log("Your transaction signature", tx2);
  });

  it("get Digital Identity acc",async () =>{
    const digitalIdAcc = await program.account.digitalIdentity.fetch(digitalIdPda);
    console.log("Acc:",digitalIdAcc);

  })


  // it("create Proof!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.
  //   createProofs({panUpload:"https://972ehndi9haid",aadharUpload:"https://akdhgiad682",passportUpload:"https://adoadi762897e9",pictureUpload:"https://aldhi6e896y2e"}).
  //   accounts({digIdentityAcc:digitalIdPda ,digProofsAcc:digitalProofPda,systemProgram:anchor.web3.SystemProgram.programId,authority:auth.publicKey}).signers([auth.payer]).rpc()
  //   console.log("Your transaction signature", tx);
  // });



  // it("get Digital Proofs acc",async () =>{
  //   const digitalProofsAcc = await program.account.digitalProofs.fetch(digitalProofPda);
  //   console.log("Acc:",digitalProofsAcc);
  // })

  // it("verifyt digital identity",async () =>{

  //   await program.methods.verifyIdentity().accounts({digIdentityAcc:digitalIdPda,authority:auth.publicKey}).rpc();

  // })
  // it("verifyt digital iproofs",async () =>{

  //   await program.methods.verifyProofs().accounts({digProofsAcc :digitalProofPda,digIdentityAcc:digitalIdPda, authority:auth.publicKey}).rpc();

  // })
});
