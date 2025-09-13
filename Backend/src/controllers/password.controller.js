import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {Password} from "../models/password.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import fs from "fs";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addPassword = asyncHandler(async (req, res) => 
{
    const {username,websiteName,websiteURL,encryptedpassword,email}=req.body;
    if(!encryptedpassword) return res.status(400).json(new ApiError(400, "Encrypted password is required"));
    try {
        const privateKeyPath = path.resolve(__dirname, "../Keys/privatekey.pem");
        const privateKey = fs.readFileSync(privateKeyPath, "utf8");

        const decryptedPassword = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(encryptedpassword, "base64")
        ).toString("utf8");

        const newPasswordEntry = new Password({
            user:req.user._id,
            username,
            websiteName,
            websiteURL,
            email,
            password: decryptedPassword,
        });
        await newPasswordEntry.save();
        return res.status(201).json(new ApiResponse(201, "Password saved successfully", newPasswordEntry));
    } catch (error) {
        console.error("Decryption or saving failed:", error);
        throw new ApiError(500, "Failed to process password");
    }
});

export const deletePassword = asyncHandler(async (req, res) => 
{
    const {passwordID}=req.params;
    try {
        const passwordEntry = await Password.findById(passwordID);
        if (!passwordEntry)return res.status(404).json({ error: "Password entry not found" });
        await passwordEntry.deleteOne();  
        res.status(200).json(new ApiResponse(200,{},"Password entry deleted successfully"));
    } catch (error) {
        console.error("Error deleting password:", error);
        res.status(500).json(new ApiError(200,"Failed to delete password"));
    }
});

export const updatePassword = asyncHandler(async (req, res) => {
    const { passwordID } = req.params;
    const updates = req.body; 
    try 
    {
        const passwordEntry = await Password.findById(passwordID);

        if (!passwordEntry) return res.status(404).json({ error: "Password entry not found" });
        if (updates.password) 
        {
            try {
                const privateKeyPath = path.resolve(__dirname, "../Keys/privatekey.pem");
                const privateKey = fs.readFileSync(privateKeyPath, "utf8");

                const decryptedPassword = crypto.privateDecrypt(
                    {
                        key: privateKey,
                        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                        oaepHash: "sha256",
                    },
                    Buffer.from(updates.password, "base64")
                ).toString("utf8");

                updates.password = decryptedPassword;
            } catch (error) {
                console.error("Password decryption failed:", error);
                return res.status(400).json({ error: "Invalid encrypted password" });
            }
        }

        Object.assign(passwordEntry, updates);
        await passwordEntry.save();
        return res.status(200).json(new ApiResponse(200,passwordEntry,"Password entry updated successfully"));
    } catch (error) {
        console.error("Error updating password entry:", error);
        res.status(500).json({ error: "Failed to update password entry" });
    }
});

export const getallPasswords=asyncHandler(async(req,res)=>{
    try {
        const userId = req.user._id;
        const passwords = await Password.find({ user: userId }).select("websiteName websiteURL");
        return res.status(200).json(new ApiResponse(200,passwords,"Passwords Fetched Successfully"));
    } catch (error) {
        console.error("Error fetching passwords:", error);
        return res.status(500).json({ error: "Failed to retrieve passwords" });
    }
});

function formatPublicKey(rawKey) {
    return `-----BEGIN PUBLIC KEY-----\n${rawKey.match(/.{1,64}/g).join("\n")}\n-----END PUBLIC KEY-----`;
}

export const getPassword = asyncHandler(async (req, res) => {
    const { passwordID } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Client public key is required" });
    
    try {
        const passwordEntry = await Password.findOne({ _id: passwordID, user: req.user._id });
        if (!passwordEntry) return res.status(404).json(new ApiResponse(404, {}, "Password entry not found"));
        let encryptedPassword;
        try {
            const formattedPublicKey = formatPublicKey(text);
            encryptedPassword = crypto.publicEncrypt(
                {
                    key: formattedPublicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                Buffer.from(passwordEntry.password, "utf8")
            ).toString("base64");
        } catch (error) {
            console.error("Encryption failed:", error);
            return res.status(500).json(new ApiResponse(500, {}, "Failed to encrypt password"));
        }

        res.status(200).json(new ApiResponse(200, {
            _id: passwordEntry._id,
            websiteName: passwordEntry.websiteName,
            websiteURL: passwordEntry.websiteURL,
            username: passwordEntry.username,
            email: passwordEntry.email,
            encryptedPassword,
        }, "Password Fetched Successfully"));
    } catch (error) {
        console.error("Error fetching password entry:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Failed to get password"));
    }
});


//TESTING FRONTEND------------------------------------------------------------

export const encryptPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    try {
        const publicKeyPath = path.resolve(__dirname, "../Keys/publickey.pem");
        const publicKey = fs.readFileSync(publicKeyPath, "utf8");

        const encryptedPassword = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(password, "utf8")
        ).toString("base64");

        return res.status(200).json({ encryptedPassword });
    } catch (error) {
        console.error("Encryption failed:", error);
        res.status(500).json({ error: "Failed to encrypt password" });
    }
});

export const decryptPassword = asyncHandler(async (req, res) => {
    const { encryptedPassword } = req.body;

    if (!encryptedPassword) {
        return res.status(400).json({ error: "Encrypted password is required" });
    }

    try {
        const privateKeyPath = path.resolve(__dirname, "../Keys/privatekey.pem");
        const privateKey = fs.readFileSync(privateKeyPath, "utf8");
        let decryptedPassword;
        try {
            decryptedPassword = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                Buffer.from(encryptedPassword, "base64")
            ).toString("utf8");
        } catch (error) {
            console.error("Decryption failed:", error);
            return res.status(500).json({ error: "Failed to decrypt password" });
        }

        return res.status(200).json({ decryptedPassword });
    } catch (error) {
        console.error("Error decrypting password:", error);
        return res.status(500).json({ error: "Failed to process request" });
    }
});