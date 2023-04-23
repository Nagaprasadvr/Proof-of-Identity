const path = require("path");
const programDir = path.join(
  __dirname,
  "..",
  "Proof-of-Identity/programs/digital-identity"
);
const idlDir = path.join(__dirname, "digitalIdentity/target/idl");
const sdkDir = path.join(__dirname, "digitalIdentity/js/src", "generated");
const binaryInstallDir = path.join(__dirname, "digitalIdentity/.crates");

module.exports = {
  idlGenerator: "anchor",
  programName: "digital_identity",
  programId: "4HYr7M3ytiSoqr3Zh3iK1VcNNm7ZgrNikwmWYJdGMvw4",
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
  anchorRemainingAccounts: false,
};