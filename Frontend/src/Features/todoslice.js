import { createSlice } from "@reduxjs/toolkit";
import forge from "node-forge";

const generateKeyPair = () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
    return { privateKey: privateKeyPem, publicKey: publicKeyPem };
};

const { privateKey, publicKey } = generateKeyPair();

const initialState = {
    privateKey,
    publicKey,
};

export const keySlice = createSlice({
    name: "keys",
    initialState,
    reducers: {
        regeneratePrivateKey: (state) => {
            const newKeys = generateKeyPair();
            return {
                ...state,
                privateKey: newKeys.privateKey,
                publicKey: newKeys.publicKey,
            };
        },
    },
});

// Exporting reducers
export const { regeneratePrivateKey } = keySlice.actions;

// Connecting store with reducers
export default keySlice.reducer;
